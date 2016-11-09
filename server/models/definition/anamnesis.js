'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Anamnesis', {
        anamnesis: {
            type: DataTypes.BIGINT,
            field: 'anamnesis',
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
        expirydate: {
            type: DataTypes.DATEONLY,
            field: 'expirydate',
            allowNull: false
        },
        Block: {
            type: DataTypes.CHAR(1),
            field: '_block',
            allowNull: true
        }
    }, {
        schema: 'general',
        tableName: 'anamnesis',
        timestamps: false
    });
};

module.exports.initRelations = function() {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
    var model = require('../index');
    var Anamnesis = model.Anamnesis;
    var Entity = model.Entity;
    var Interview = model.Interview;
    var Patient = model.Patient;
    var Quiz = model.Quiz;

    Anamnesis.belongsTo(Entity, {
        as: 'RelatedEntity',
        foreignKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Anamnesis.belongsTo(Interview, {
        as: 'RelatedInterview',
        foreignKey: 'interview',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Anamnesis.belongsTo(Patient, {
        as: 'RelatedPatient',
        foreignKey: 'patient',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Anamnesis.belongsTo(Quiz, {
        as: 'RelatedQuiz',
        foreignKey: 'quiz',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
