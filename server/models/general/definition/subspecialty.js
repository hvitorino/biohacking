'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Subspecialty', {
        subspecialty: {
            type: DataTypes.BIGINT,
            field: 'subspecialty',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        entity: {
            type: DataTypes.BIGINT,
            field: 'entity',
            allowNull: false
        },
        localspecialty: {
            type: DataTypes.BIGINT,
            field: 'localspecialty',
            allowNull: false,
            references: {
                model: 'localspecialty',
                key: 'localspecialty'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
        },
        description: {
            type: DataTypes.STRING(100),
            field: 'description',
            allowNull: false
        },
        matchcode: {
            type: DataTypes.HSTORE,
            field: 'matchcode',
            allowNull: true
        },
        Block: {
            type: DataTypes.CHAR(1),
            field: '_block',
            allowNull: true
        }
    }, {
        schema: 'general',
        tableName: 'subspecialty',
        timestamps: false
    });
};

module.exports.initRelations = function() {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
    var model = require('../index');
    var Subspecialty = model.Subspecialty;
    var Quizspecialty = model.Quizspecialty;
    var Localspecialty = model.Localspecialty;
    var Quiz = model.Quiz;

    Subspecialty.hasMany(Quizspecialty, {
        as: 'FkquizspecialtySubs',
        foreignKey: 'subspecialty',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Subspecialty.belongsTo(Localspecialty, {
        as: 'RelatedLocalspecialty',
        foreignKey: 'localspecialty',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Subspecialty.belongsToMany(Quiz, {
        as: 'QuizspecialtyQuizzes',
        through: Quizspecialty,
        foreignKey: 'subspecialty',
        otherKey: 'quiz',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Subspecialty.belongsToMany(Localspecialty, {
        as: 'QuizspecialtyLocalspecialties',
        through: Quizspecialty,
        foreignKey: 'subspecialty',
        otherKey: 'localspecialty',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
