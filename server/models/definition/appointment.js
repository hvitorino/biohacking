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
            allowNull: false,
            references: {
                model: 'entity',
                key: 'entity'
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
        appointmentid: {
            type: DataTypes.INTEGER,
            field: 'appointmentid',
            allowNull: false
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
        subspecialty: {
            type: DataTypes.BIGINT,
            field: 'subspecialty',
            allowNull: true,
            references: {
                model: 'subspecialty',
                key: 'subspecialty'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
        },
        employee: {
            type: DataTypes.BIGINT,
            field: 'employee',
            allowNull: false,
            references: {
                model: 'employee',
                key: 'employee'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
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
            allowNull: true,
            references: {
                model: 'employee',
                key: 'employee'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
        },
        executant: {
            type: DataTypes.BIGINT,
            field: 'executant',
            allowNull: true,
            references: {
                model: 'employee',
                key: 'employee'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
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
    var Employee = model.Employee;
    var Entity = model.Entity;
    var Office = model.Office;
    var Patient = model.Patient;
    var Schedule = model.Schedule;
    var Specialty = model.Specialty;
    var Subspecialty = model.Subspecialty;

    Appointment.hasMany(Appointment, {
        as: 'FkappointmentLas',
        foreignKey: 'lastappointment',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Appointment.belongsTo(Employee, {
        as: 'RelatedEmployee',
        foreignKey: 'employee',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Appointment.belongsTo(Entity, {
        as: 'RelatedEntity',
        foreignKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Appointment.belongsTo(Employee, {
        as: 'RelatedExecutant',
        foreignKey: 'executant',
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

    Appointment.belongsTo(Patient, {
        as: 'RelatedPatient',
        foreignKey: 'patient',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Appointment.belongsTo(Employee, {
        as: 'RelatedRequester',
        foreignKey: 'requester',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Appointment.belongsTo(Schedule, {
        as: 'RelatedSchedule',
        foreignKey: 'schedule',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Appointment.belongsTo(Specialty, {
        as: 'RelatedSpecialty',
        foreignKey: 'specialty',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Appointment.belongsTo(Subspecialty, {
        as: 'RelatedSubspecialty',
        foreignKey: 'subspecialty',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Appointment.belongsToMany(Employee, {
        as: 'AppointmentEmployees',
        through: Appointment,
        foreignKey: 'lastappointment',
        otherKey: 'employee',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Appointment.belongsToMany(Entity, {
        as: 'AppointmentEntities',
        through: Appointment,
        foreignKey: 'lastappointment',
        otherKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Appointment.belongsToMany(Employee, {
        as: 'AppointmentExecutants',
        through: Appointment,
        foreignKey: 'lastappointment',
        otherKey: 'executant',
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

    Appointment.belongsToMany(Patient, {
        as: 'AppointmentPatients',
        through: Appointment,
        foreignKey: 'lastappointment',
        otherKey: 'patient',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Appointment.belongsToMany(Employee, {
        as: 'AppointmentRequesters',
        through: Appointment,
        foreignKey: 'lastappointment',
        otherKey: 'requester',
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

    Appointment.belongsToMany(Specialty, {
        as: 'AppointmentSpecialties',
        through: Appointment,
        foreignKey: 'lastappointment',
        otherKey: 'specialty',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Appointment.belongsToMany(Subspecialty, {
        as: 'AppointmentSubspecialties',
        through: Appointment,
        foreignKey: 'lastappointment',
        otherKey: 'subspecialty',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
