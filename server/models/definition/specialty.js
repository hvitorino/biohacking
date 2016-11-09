'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Specialty', {
        specialty: {
            type: DataTypes.BIGINT,
            field: 'specialty',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        description: {
            type: DataTypes.STRING(100),
            field: 'description',
            allowNull: false
        },
        typeof: {
            type: DataTypes.CHAR(1),
            field: 'typeof',
            allowNull: false,
            defaultValue: "A"
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
        schema: 'shared',
        tableName: 'specialty',
        timestamps: false
    });
};

module.exports.initRelations = function() {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
    var model = require('../index');
    var Specialty = model.Specialty;
    var Quizspecialty = model.Quizspecialty;
    var Subspecialty = model.Subspecialty;
    var Appointment = model.Appointment;
    var Schedule = model.Schedule;
    var Schedulespecialty = model.Schedulespecialty;
    var Entity = model.Entity;
    var Quiz = model.Quiz;
    var Employee = model.Employee;
    var Office = model.Office;
    var Patient = model.Patient;
    var Scheduletemplate = model.Scheduletemplate;

    Specialty.hasMany(Quizspecialty, {
        as: 'FkquizspecialtySpes',
        foreignKey: 'specialty',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Specialty.hasMany(Subspecialty, {
        as: 'FksubspecialtySpes',
        foreignKey: 'specialty',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Specialty.hasMany(Appointment, {
        as: 'FkappointmentSpes',
        foreignKey: 'specialty',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Specialty.hasMany(Schedule, {
        as: 'FkscheduleSpes',
        foreignKey: 'specialty',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Specialty.hasMany(Schedulespecialty, {
        as: 'FkschedulespecialtySpes',
        foreignKey: 'specialty',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Specialty.belongsToMany(Entity, {
        as: 'QuizspecialtyEntities',
        through: Quizspecialty,
        foreignKey: 'specialty',
        otherKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Specialty.belongsToMany(Quiz, {
        as: 'QuizspecialtyQuizzes',
        through: Quizspecialty,
        foreignKey: 'specialty',
        otherKey: 'quiz',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Specialty.belongsToMany(Subspecialty, {
        as: 'QuizspecialtySubspecialties',
        through: Quizspecialty,
        foreignKey: 'specialty',
        otherKey: 'subspecialty',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Specialty.belongsToMany(Entity, {
        as: 'SubspecialtyEntities',
        through: Subspecialty,
        foreignKey: 'specialty',
        otherKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Specialty.belongsToMany(Employee, {
        as: 'AppointmentEmployees',
        through: Appointment,
        foreignKey: 'specialty',
        otherKey: 'employee',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Specialty.belongsToMany(Entity, {
        as: 'AppointmentEntities',
        through: Appointment,
        foreignKey: 'specialty',
        otherKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Specialty.belongsToMany(Employee, {
        as: 'AppointmentExecutants',
        through: Appointment,
        foreignKey: 'specialty',
        otherKey: 'executant',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Specialty.belongsToMany(Appointment, {
        as: 'AppointmentLastappointments',
        through: Appointment,
        foreignKey: 'specialty',
        otherKey: 'lastappointment',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Specialty.belongsToMany(Office, {
        as: 'AppointmentOffices',
        through: Appointment,
        foreignKey: 'specialty',
        otherKey: 'office',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Specialty.belongsToMany(Patient, {
        as: 'AppointmentPatients',
        through: Appointment,
        foreignKey: 'specialty',
        otherKey: 'patient',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Specialty.belongsToMany(Employee, {
        as: 'AppointmentRequesters',
        through: Appointment,
        foreignKey: 'specialty',
        otherKey: 'requester',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Specialty.belongsToMany(Schedule, {
        as: 'AppointmentSchedules',
        through: Appointment,
        foreignKey: 'specialty',
        otherKey: 'schedule',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Specialty.belongsToMany(Subspecialty, {
        as: 'AppointmentSubspecialties',
        through: Appointment,
        foreignKey: 'specialty',
        otherKey: 'subspecialty',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Specialty.belongsToMany(Employee, {
        as: 'ScheduleEmployees',
        through: Schedule,
        foreignKey: 'specialty',
        otherKey: 'employee',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Specialty.belongsToMany(Entity, {
        as: 'ScheduleEntities',
        through: Schedule,
        foreignKey: 'specialty',
        otherKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Specialty.belongsToMany(Office, {
        as: 'ScheduleOffices',
        through: Schedule,
        foreignKey: 'specialty',
        otherKey: 'office',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Specialty.belongsToMany(Scheduletemplate, {
        as: 'ScheduleScheduletemplates',
        through: Schedule,
        foreignKey: 'specialty',
        otherKey: 'scheduletemplate',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Specialty.belongsToMany(Subspecialty, {
        as: 'ScheduleSubspecialties',
        through: Schedule,
        foreignKey: 'specialty',
        otherKey: 'subspecialty',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Specialty.belongsToMany(Entity, {
        as: 'SchedulespecialtyEntities',
        through: Schedulespecialty,
        foreignKey: 'specialty',
        otherKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Specialty.belongsToMany(Scheduletemplate, {
        as: 'SchedulespecialtyScheduletemplates',
        through: Schedulespecialty,
        foreignKey: 'specialty',
        otherKey: 'scheduletemplate',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Specialty.belongsToMany(Subspecialty, {
        as: 'SchedulespecialtySubspecialties',
        through: Schedulespecialty,
        foreignKey: 'specialty',
        otherKey: 'subspecialty',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
