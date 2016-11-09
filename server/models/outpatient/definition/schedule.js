'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Schedule', {
        schedule: {
            type: DataTypes.BIGINT,
            field: 'schedule',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        entity: {
            type: DataTypes.BIGINT,
            field: 'entity',
            allowNull: false
        },
        localemployee: {
            type: DataTypes.BIGINT,
            field: 'localemployee',
            allowNull: true
        },
        localspecialty: {
            type: DataTypes.BIGINT,
            field: 'localspecialty',
            allowNull: false
        },
        subspecialty: {
            type: DataTypes.BIGINT,
            field: 'subspecialty',
            allowNull: true
        },
        office: {
            type: DataTypes.BIGINT,
            field: 'office',
            allowNull: true,
            references: {
                model: 'office',
                key: 'office'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
        },
        scheduletemplate: {
            type: DataTypes.BIGINT,
            field: 'scheduletemplate',
            allowNull: true,
            references: {
                model: 'scheduletemplate',
                key: 'scheduletemplate'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
        },
        scheduledate: {
            type: DataTypes.DATE,
            field: 'scheduledate',
            allowNull: false
        },
        schedulestatus: {
            type: DataTypes.CHAR(1),
            field: 'schedulestatus',
            allowNull: false,
            defaultValue: "V"
        },
        Block: {
            type: DataTypes.CHAR(1),
            field: '_block',
            allowNull: true
        }
    }, {
        schema: 'outpatient',
        tableName: 'schedule',
        timestamps: false
    });
};

module.exports.initRelations = function() {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
    var model = require('../index');
    var Schedule = model.Schedule;
    var Appointment = model.Appointment;
    var Office = model.Office;
    var Scheduletemplate = model.Scheduletemplate;

    Schedule.hasMany(Appointment, {
        as: 'FkappointmentSches',
        foreignKey: 'schedule',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Schedule.belongsTo(Office, {
        as: 'RelatedOffice',
        foreignKey: 'office',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Schedule.belongsTo(Scheduletemplate, {
        as: 'RelatedScheduletemplate',
        foreignKey: 'scheduletemplate',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Schedule.belongsToMany(Appointment, {
        as: 'AppointmentLastappointments',
        through: Appointment,
        foreignKey: 'schedule',
        otherKey: 'lastappointment',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Schedule.belongsToMany(Office, {
        as: 'AppointmentOffices',
        through: Appointment,
        foreignKey: 'schedule',
        otherKey: 'office',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
