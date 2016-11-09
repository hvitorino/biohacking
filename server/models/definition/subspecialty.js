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
            allowNull: false,
            references: {
                model: 'entity',
                key: 'entity'
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
    var Appointment = model.Appointment;
    var Schedule = model.Schedule;
    var Schedulespecialty = model.Schedulespecialty;
    var Entity = model.Entity;
    var Specialty = model.Specialty;
    var Quiz = model.Quiz;
    var Employee = model.Employee;
    var Office = model.Office;
    var Patient = model.Patient;
    var Scheduletemplate = model.Scheduletemplate;

    Subspecialty.hasMany(Quizspecialty, {
        as: 'FkquizspecialtySubs',
        foreignKey: 'subspecialty',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Subspecialty.hasMany(Appointment, {
        as: 'FkappointmentSubs',
        foreignKey: 'subspecialty',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Subspecialty.hasMany(Schedule, {
        as: 'FkscheduleSubs',
        foreignKey: 'subspecialty',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Subspecialty.hasMany(Schedulespecialty, {
        as: 'FkschedulespecialtySubs',
        foreignKey: 'subspecialty',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Subspecialty.belongsTo(Entity, {
        as: 'RelatedEntity',
        foreignKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Subspecialty.belongsTo(Specialty, {
        as: 'RelatedSpecialty',
        foreignKey: 'specialty',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Subspecialty.belongsToMany(Entity, {
        as: 'QuizspecialtyEntities',
        through: Quizspecialty,
        foreignKey: 'subspecialty',
        otherKey: 'entity',
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

    Subspecialty.belongsToMany(Specialty, {
        as: 'QuizspecialtySpecialties',
        through: Quizspecialty,
        foreignKey: 'subspecialty',
        otherKey: 'specialty',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Subspecialty.belongsToMany(Employee, {
        as: 'AppointmentEmployees',
        through: Appointment,
        foreignKey: 'subspecialty',
        otherKey: 'employee',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Subspecialty.belongsToMany(Entity, {
        as: 'AppointmentEntities',
        through: Appointment,
        foreignKey: 'subspecialty',
        otherKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Subspecialty.belongsToMany(Employee, {
        as: 'AppointmentExecutants',
        through: Appointment,
        foreignKey: 'subspecialty',
        otherKey: 'executant',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Subspecialty.belongsToMany(Appointment, {
        as: 'AppointmentLastappointments',
        through: Appointment,
        foreignKey: 'subspecialty',
        otherKey: 'lastappointment',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Subspecialty.belongsToMany(Office, {
        as: 'AppointmentOffices',
        through: Appointment,
        foreignKey: 'subspecialty',
        otherKey: 'office',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Subspecialty.belongsToMany(Patient, {
        as: 'AppointmentPatients',
        through: Appointment,
        foreignKey: 'subspecialty',
        otherKey: 'patient',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Subspecialty.belongsToMany(Employee, {
        as: 'AppointmentRequesters',
        through: Appointment,
        foreignKey: 'subspecialty',
        otherKey: 'requester',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Subspecialty.belongsToMany(Schedule, {
        as: 'AppointmentSchedules',
        through: Appointment,
        foreignKey: 'subspecialty',
        otherKey: 'schedule',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Subspecialty.belongsToMany(Specialty, {
        as: 'AppointmentSpecialties',
        through: Appointment,
        foreignKey: 'subspecialty',
        otherKey: 'specialty',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Subspecialty.belongsToMany(Employee, {
        as: 'ScheduleEmployees',
        through: Schedule,
        foreignKey: 'subspecialty',
        otherKey: 'employee',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Subspecialty.belongsToMany(Entity, {
        as: 'ScheduleEntities',
        through: Schedule,
        foreignKey: 'subspecialty',
        otherKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Subspecialty.belongsToMany(Office, {
        as: 'ScheduleOffices',
        through: Schedule,
        foreignKey: 'subspecialty',
        otherKey: 'office',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Subspecialty.belongsToMany(Scheduletemplate, {
        as: 'ScheduleScheduletemplates',
        through: Schedule,
        foreignKey: 'subspecialty',
        otherKey: 'scheduletemplate',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Subspecialty.belongsToMany(Specialty, {
        as: 'ScheduleSpecialties',
        through: Schedule,
        foreignKey: 'subspecialty',
        otherKey: 'specialty',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Subspecialty.belongsToMany(Entity, {
        as: 'SchedulespecialtyEntities',
        through: Schedulespecialty,
        foreignKey: 'subspecialty',
        otherKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Subspecialty.belongsToMany(Scheduletemplate, {
        as: 'SchedulespecialtyScheduletemplates',
        through: Schedulespecialty,
        foreignKey: 'subspecialty',
        otherKey: 'scheduletemplate',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Subspecialty.belongsToMany(Specialty, {
        as: 'SchedulespecialtySpecialties',
        through: Schedulespecialty,
        foreignKey: 'subspecialty',
        otherKey: 'specialty',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
