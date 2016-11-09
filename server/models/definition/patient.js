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
            allowNull: false,
            references: {
                model: 'entity',
                key: 'entity'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
        },
        person: {
            type: DataTypes.BIGINT,
            field: 'person',
            allowNull: false,
            references: {
                model: 'person',
                key: 'person'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
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
    var Appointment = model.Appointment;
    var Followup = model.Followup;
    var Entity = model.Entity;
    var Person = model.Person;
    var Quiz = model.Quiz;
    var Employee = model.Employee;
    var Office = model.Office;
    var Schedule = model.Schedule;
    var Specialty = model.Specialty;
    var Subspecialty = model.Subspecialty;

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

    Patient.hasMany(Appointment, {
        as: 'FkappointmentPats',
        foreignKey: 'patient',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Patient.hasMany(Followup, {
        as: 'FkfollowupPats',
        foreignKey: 'patient',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Patient.belongsTo(Entity, {
        as: 'RelatedEntity',
        foreignKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Patient.belongsTo(Person, {
        as: 'RelatedPerson',
        foreignKey: 'person',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Patient.belongsToMany(Entity, {
        as: 'AnamnesisEntities',
        through: Anamnesis,
        foreignKey: 'patient',
        otherKey: 'entity',
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

    Patient.belongsToMany(Employee, {
        as: 'InterviewEmployees',
        through: Interview,
        foreignKey: 'patient',
        otherKey: 'employee',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Patient.belongsToMany(Entity, {
        as: 'InterviewEntities',
        through: Interview,
        foreignKey: 'patient',
        otherKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Patient.belongsToMany(Entity, {
        as: 'PatientlogEntities',
        through: Patientlog,
        foreignKey: 'patient',
        otherKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Patient.belongsToMany(Entity, {
        as: 'ReevaluationEntities',
        through: Reevaluation,
        foreignKey: 'patient',
        otherKey: 'entity',
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

    Patient.belongsToMany(Entity, {
        as: 'TreatmentEntities',
        through: Treatment,
        foreignKey: 'patient',
        otherKey: 'entity',
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

    Patient.belongsToMany(Employee, {
        as: 'AppointmentEmployees',
        through: Appointment,
        foreignKey: 'patient',
        otherKey: 'employee',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Patient.belongsToMany(Entity, {
        as: 'AppointmentEntities',
        through: Appointment,
        foreignKey: 'patient',
        otherKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Patient.belongsToMany(Employee, {
        as: 'AppointmentExecutants',
        through: Appointment,
        foreignKey: 'patient',
        otherKey: 'executant',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Patient.belongsToMany(Appointment, {
        as: 'AppointmentLastappointments',
        through: Appointment,
        foreignKey: 'patient',
        otherKey: 'lastappointment',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Patient.belongsToMany(Office, {
        as: 'AppointmentOffices',
        through: Appointment,
        foreignKey: 'patient',
        otherKey: 'office',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Patient.belongsToMany(Employee, {
        as: 'AppointmentRequesters',
        through: Appointment,
        foreignKey: 'patient',
        otherKey: 'requester',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Patient.belongsToMany(Schedule, {
        as: 'AppointmentSchedules',
        through: Appointment,
        foreignKey: 'patient',
        otherKey: 'schedule',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Patient.belongsToMany(Specialty, {
        as: 'AppointmentSpecialties',
        through: Appointment,
        foreignKey: 'patient',
        otherKey: 'specialty',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Patient.belongsToMany(Subspecialty, {
        as: 'AppointmentSubspecialties',
        through: Appointment,
        foreignKey: 'patient',
        otherKey: 'subspecialty',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Patient.belongsToMany(Entity, {
        as: 'FollowupEntities',
        through: Followup,
        foreignKey: 'patient',
        otherKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Patient.belongsToMany(Interview, {
        as: 'FollowupInterviews',
        through: Followup,
        foreignKey: 'patient',
        otherKey: 'interview',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Patient.belongsToMany(Quiz, {
        as: 'FollowupQuizzes',
        through: Followup,
        foreignKey: 'patient',
        otherKey: 'quiz',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
