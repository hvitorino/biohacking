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
            allowNull: false
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

    Office.belongsToMany(Appointment, {
        as: 'AppointmentLastappointments',
        through: Appointment,
        foreignKey: 'office',
        otherKey: 'lastappointment',
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

    Office.belongsToMany(Scheduletemplate, {
        as: 'ScheduleScheduletemplates',
        through: Schedule,
        foreignKey: 'office',
        otherKey: 'scheduletemplate',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
