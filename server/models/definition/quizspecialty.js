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
            allowNull: false,
            references: {
                model: 'entity',
                key: 'entity'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
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
        specialty: {
            type: DataTypes.BIGINT,
            field: 'specialty',
            allowNull: false,
            references: {
                model: 'specialty',
                key: 'specialty'
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
    var Entity = model.Entity;
    var Quiz = model.Quiz;
    var Specialty = model.Specialty;
    var Subspecialty = model.Subspecialty;

    Quizspecialty.belongsTo(Entity, {
        as: 'RelatedEntity',
        foreignKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Quizspecialty.belongsTo(Quiz, {
        as: 'RelatedQuiz',
        foreignKey: 'quiz',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Quizspecialty.belongsTo(Specialty, {
        as: 'RelatedSpecialty',
        foreignKey: 'specialty',
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
