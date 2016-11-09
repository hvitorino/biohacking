'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Followup', {
        followup: {
            type: DataTypes.BIGINT,
            field: 'followup',
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
        interview: {
            type: DataTypes.BIGINT,
            field: 'interview',
            allowNull: false,
            references: {
                model: 'interview',
                key: 'interview'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
        },
        patient: {
            type: DataTypes.BIGINT,
            field: 'patient',
            allowNull: false,
            references: {
                model: 'patient',
                key: 'patient'
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
        Block: {
            type: DataTypes.CHAR(1),
            field: '_block',
            allowNull: true
        }
    }, {
        schema: 'outpatient',
        tableName: 'followup',
        timestamps: false
    });
};

module.exports.initRelations = function() {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
    var model = require('../index');
    var Followup = model.Followup;
    var Entity = model.Entity;
    var Interview = model.Interview;
    var Patient = model.Patient;
    var Quiz = model.Quiz;

    Followup.belongsTo(Entity, {
        as: 'RelatedEntity',
        foreignKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Followup.belongsTo(Interview, {
        as: 'RelatedInterview',
        foreignKey: 'interview',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Followup.belongsTo(Patient, {
        as: 'RelatedPatient',
        foreignKey: 'patient',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Followup.belongsTo(Quiz, {
        as: 'RelatedQuiz',
        foreignKey: 'quiz',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
