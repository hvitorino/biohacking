'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Office', {
        office: {
            type: DataTypes.BIGINT,
            field: 'office',
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
        description: {
            type: DataTypes.STRING(100),
            field: 'description',
            allowNull: false
        },
        Block: {
            type: DataTypes.CHAR(1),
            field: '_block',
            allowNull: true
        }
    }, {
        schema: 'outpatient',
        tableName: 'office',
        timestamps: false
    });
};

module.exports.initRelations = function() {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
    var model = require('../index');
    var Office = model.Office;
    var Appointment = model.Appointment;
    var Schedule = model.Schedule;
    var Scheduletemplate = model.Scheduletemplate;
    var Entity = model.Entity;
    var Employee = model.Employee;
    var Patient = model.Patient;
    var Specialty = model.Specialty;
    var Subspecialty = model.Subspecialty;

    Office.hasMany(Appointment, {
        as: 'FkappointmentOffs',
        foreignKey: 'office',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Office.hasMany(Schedule, {
        as: 'FkscheduleOffs',
        foreignKey: 'office',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Office.hasMany(Scheduletemplate, {
        as: 'FkscheduletemplateOffs',
        foreignKey: 'office',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Office.belongsTo(Entity, {
        as: 'RelatedEntity',
        foreignKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Office.belongsToMany(Employee, {
        as: 'AppointmentEmployees',
        through: Appointment,
        foreignKey: 'office',
        otherKey: 'employee',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Office.belongsToMany(Entity, {
        as: 'AppointmentEntities',
        through: Appointment,
        foreignKey: 'office',
        otherKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Office.belongsToMany(Employee, {
        as: 'AppointmentExecutants',
        through: Appointment,
        foreignKey: 'office',
        otherKey: 'executant',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Office.belongsToMany(Appointment, {
        as: 'AppointmentLastappointments',
        through: Appointment,
        foreignKey: 'office',
        otherKey: 'lastappointment',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Office.belongsToMany(Patient, {
        as: 'AppointmentPatients',
        through: Appointment,
        foreignKey: 'office',
        otherKey: 'patient',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Office.belongsToMany(Employee, {
        as: 'AppointmentRequesters',
        through: Appointment,
        foreignKey: 'office',
        otherKey: 'requester',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Office.belongsToMany(Schedule, {
        as: 'AppointmentSchedules',
        through: Appointment,
        foreignKey: 'office',
        otherKey: 'schedule',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Office.belongsToMany(Specialty, {
        as: 'AppointmentSpecialties',
        through: Appointment,
        foreignKey: 'office',
        otherKey: 'specialty',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Office.belongsToMany(Subspecialty, {
        as: 'AppointmentSubspecialties',
        through: Appointment,
        foreignKey: 'office',
        otherKey: 'subspecialty',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Office.belongsToMany(Employee, {
        as: 'ScheduleEmployees',
        through: Schedule,
        foreignKey: 'office',
        otherKey: 'employee',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Office.belongsToMany(Entity, {
        as: 'ScheduleEntities',
        through: Schedule,
        foreignKey: 'office',
        otherKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Office.belongsToMany(Scheduletemplate, {
        as: 'ScheduleScheduletemplates',
        through: Schedule,
        foreignKey: 'office',
        otherKey: 'scheduletemplate',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Office.belongsToMany(Specialty, {
        as: 'ScheduleSpecialties',
        through: Schedule,
        foreignKey: 'office',
        otherKey: 'specialty',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Office.belongsToMany(Subspecialty, {
        as: 'ScheduleSubspecialties',
        through: Schedule,
        foreignKey: 'office',
        otherKey: 'subspecialty',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Office.belongsToMany(Employee, {
        as: 'ScheduletemplateEmployees',
        through: Scheduletemplate,
        foreignKey: 'office',
        otherKey: 'employee',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Office.belongsToMany(Entity, {
        as: 'ScheduletemplateEntities',
        through: Scheduletemplate,
        foreignKey: 'office',
        otherKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
