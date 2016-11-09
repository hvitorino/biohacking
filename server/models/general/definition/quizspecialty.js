'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Quizspecialty', {
        quizspecialty: {
            type: DataTypes.BIGINT,
            field: 'quizspecialty',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        entity: {
            type: DataTypes.BIGINT,
            field: 'entity',
            allowNull: false
        },
        quiz: {
            type: DataTypes.BIGINT,
            field: 'quiz',
            allowNull: false,
            references: {
                model: 'quiz',
                key: 'quiz'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
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
        subspecialty: {
            type: DataTypes.BIGINT,
            field: 'subspecialty',
            allowNull: true,
            references: {
                model: 'subspecialty',
                key: 'subspecialty'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
        },
        startdate: {
            type: DataTypes.DATEONLY,
            field: 'startdate',
            allowNull: false
        },
        enddate: {
            type: DataTypes.DATEONLY,
            field: 'enddate',
            allowNull: true
        },
        Block: {
            type: DataTypes.CHAR(1),
            field: '_block',
            allowNull: true
        }
    }, {
        schema: 'general',
        tableName: 'quizspecialty',
        timestamps: false
    });
};

module.exports.initRelations = function() {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
    var model = require('../index');
    var Quizspecialty = model.Quizspecialty;
    var Quiz = model.Quiz;
    var Localspecialty = model.Localspecialty;
    var Subspecialty = model.Subspecialty;

    Quizspecialty.belongsTo(Quiz, {
        as: 'RelatedQuiz',
        foreignKey: 'quiz',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Quizspecialty.belongsTo(Localspecialty, {
        as: 'RelatedLocalspecialty',
        foreignKey: 'localspecialty',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Quizspecialty.belongsTo(Subspecialty, {
        as: 'RelatedSubspecialty',
        foreignKey: 'subspecialty',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
