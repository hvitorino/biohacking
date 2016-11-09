'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Patient', {
        patient: {
            type: DataTypes.BIGINT,
            field: 'patient',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        entity: {
            type: DataTypes.BIGINT,
            field: 'entity',
            allowNull: false
        },
        person: {
            type: DataTypes.BIGINT,
            field: 'person',
            allowNull: false
        },
        patientid: {
            type: DataTypes.STRING(30),
            field: 'patientid',
            allowNull: false
        },
        lastadmission: {
            type: DataTypes.DATEONLY,
            field: 'lastadmission',
            allowNull: false
        },
        Block: {
            type: DataTypes.CHAR(1),
            field: '_block',
            allowNull: true
        }
    }, {
        schema: 'general',
        tableName: 'patient',
        timestamps: false
    });
};

module.exports.initRelations = function() {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
    var model = require('../index');
    var Patient = model.Patient;
    var Anamnesis = model.Anamnesis;
    var Interview = model.Interview;
    var Patientlog = model.Patientlog;
    var Reevaluation = model.Reevaluation;
    var Treatment = model.Treatment;
    var Quiz = model.Quiz;
    var Localemployee = model.Localemployee;

    Patient.hasMany(Anamnesis, {
        as: 'FkanamnesisPats',
        foreignKey: 'patient',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Patient.hasMany(Interview, {
        as: 'FkinterviewPats',
        foreignKey: 'patient',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Patient.hasMany(Patientlog, {
        as: 'FkpatientlogPats',
        foreignKey: 'patient',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Patient.hasMany(Reevaluation, {
        as: 'FkreevaluationPats',
        foreignKey: 'patient',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Patient.hasMany(Treatment, {
        as: 'FktreatmentPats',
        foreignKey: 'patient',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Patient.belongsToMany(Interview, {
        as: 'AnamnesisInterviews',
        through: Anamnesis,
        foreignKey: 'patient',
        otherKey: 'interview',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Patient.belongsToMany(Quiz, {
        as: 'AnamnesisQuizzes',
        through: Anamnesis,
        foreignKey: 'patient',
        otherKey: 'quiz',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Patient.belongsToMany(Localemployee, {
        as: 'InterviewLocalemployees',
        through: Interview,
        foreignKey: 'patient',
        otherKey: 'localemployee',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Patient.belongsToMany(Interview, {
        as: 'ReevaluationInterviews',
        through: Reevaluation,
        foreignKey: 'patient',
        otherKey: 'interview',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Patient.belongsToMany(Interview, {
        as: 'TreatmentInterviews',
        through: Treatment,
        foreignKey: 'patient',
        otherKey: 'interview',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
