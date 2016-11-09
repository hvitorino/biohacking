'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Appointment', {
        appointment: {
            type: DataTypes.BIGINT,
            field: 'appointment',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        entity: {
            type: DataTypes.BIGINT,
            field: 'entity',
            allowNull: false
        },
        patient: {
            type: DataTypes.BIGINT,
            field: 'patient',
            allowNull: false
        },
        appointmentid: {
            type: DataTypes.INTEGER,
            field: 'appointmentid',
            allowNull: false
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
        localemployee: {
            type: DataTypes.BIGINT,
            field: 'localemployee',
            allowNull: false
        },
        schedule: {
            type: DataTypes.BIGINT,
            field: 'schedule',
            allowNull: true,
            references: {
                model: 'schedule',
                key: 'schedule'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
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
        appointmentdate: {
            type: DataTypes.DATE,
            field: 'appointmentdate',
            allowNull: false
        },
        sequel: {
            type: DataTypes.DECIMAL(4),
            field: 'sequel',
            allowNull: true
        },
        remark: {
            type: DataTypes.STRING(400),
            field: 'remark',
            allowNull: true
        },
        requester: {
            type: DataTypes.BIGINT,
            field: 'requester',
            allowNull: true
        },
        executant: {
            type: DataTypes.BIGINT,
            field: 'executant',
            allowNull: true
        },
        executiondate: {
            type: DataTypes.DATE,
            field: 'executiondate',
            allowNull: true
        },
        appointmentstatus: {
            type: DataTypes.CHAR(1),
            field: 'appointmentstatus',
            allowNull: false,
            defaultValue: "S"
        },
        lastappointment: {
            type: DataTypes.BIGINT,
            field: 'lastappointment',
            allowNull: true,
            references: {
                model: 'appointment',
                key: 'appointment'
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
        tableName: 'appointment',
        timestamps: false
    });
};

module.exports.initRelations = function() {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
    var model = require('../index');
    var Appointment = model.Appointment;
    var Office = model.Office;
    var Schedule = model.Schedule;

    Appointment.hasMany(Appointment, {
        as: 'FkappointmentLas',
        foreignKey: 'lastappointment',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Appointment.belongsTo(Appointment, {
        as: 'RelatedLastappointment',
        foreignKey: 'lastappointment',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Appointment.belongsTo(Office, {
        as: 'RelatedOffice',
        foreignKey: 'office',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Appointment.belongsTo(Schedule, {
        as: 'RelatedSchedule',
        foreignKey: 'schedule',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Appointment.belongsToMany(Office, {
        as: 'AppointmentOffices',
        through: Appointment,
        foreignKey: 'lastappointment',
        otherKey: 'office',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Appointment.belongsToMany(Schedule, {
        as: 'AppointmentSchedules',
        through: Appointment,
        foreignKey: 'lastappointment',
        otherKey: 'schedule',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
