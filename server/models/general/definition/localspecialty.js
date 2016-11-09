'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Localspecialty', {
        localspecialty: {
            type: DataTypes.BIGINT,
            field: 'localspecialty',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        entity: {
            type: DataTypes.BIGINT,
            field: 'entity',
            allowNull: false
        },
        specialty: {
            type: DataTypes.BIGINT,
            field: 'specialty',
            allowNull: false
        },
        Block: {
            type: DataTypes.CHAR(1),
            field: '_block',
            allowNull: true
        }
    }, {
        schema: 'general',
        tableName: 'localspecialty',
        timestamps: false
    });
};

module.exports.initRelations = function() {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
    var model = require('../index');
    var Localspecialty = model.Localspecialty;
    var Quizspecialty = model.Quizspecialty;
    var Subspecialty = model.Subspecialty;
    var Quiz = model.Quiz;

    Localspecialty.hasMany(Quizspecialty, {
        as: 'FkquizspecialtySpes',
        foreignKey: 'localspecialty',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Localspecialty.hasMany(Subspecialty, {
        as: 'FksubspecialtySpes',
        foreignKey: 'localspecialty',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Localspecialty.belongsToMany(Quiz, {
        as: 'QuizspecialtyQuizzes',
        through: Quizspecialty,
        foreignKey: 'localspecialty',
        otherKey: 'quiz',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Localspecialty.belongsToMany(Subspecialty, {
        as: 'QuizspecialtySubspecialties',
        through: Quizspecialty,
        foreignKey: 'localspecialty',
        otherKey: 'subspecialty',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
