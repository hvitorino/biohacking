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
            allowNull: false,
            references: {
                model: 'entity',
                key: 'entity'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
        },
        employee: {
            type: DataTypes.BIGINT,
            field: 'employee',
            allowNull: true,
            references: {
                model: 'employee',
                key: 'employee'
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
    var Employee = model.Employee;
    var Entity = model.Entity;
    var Office = model.Office;
    var Scheduletemplate = model.Scheduletemplate;
    var Specialty = model.Specialty;
    var Subspecialty = model.Subspecialty;
    var Patient = model.Patient;

    Schedule.hasMany(Appointment, {
        as: 'FkappointmentSches',
        foreignKey: 'schedule',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Schedule.belongsTo(Employee, {
        as: 'RelatedEmployee',
        foreignKey: 'employee',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Schedule.belongsTo(Entity, {
        as: 'RelatedEntity',
        foreignKey: 'entity',
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

    Schedule.belongsTo(Specialty, {
        as: 'RelatedSpecialty',
        foreignKey: 'specialty',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Schedule.belongsTo(Subspecialty, {
        as: 'RelatedSubspecialty',
        foreignKey: 'subspecialty',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Schedule.belongsToMany(Employee, {
        as: 'AppointmentEmployees',
        through: Appointment,
        foreignKey: 'schedule',
        otherKey: 'employee',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Schedule.belongsToMany(Entity, {
        as: 'AppointmentEntities',
        through: Appointment,
        foreignKey: 'schedule',
        otherKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Schedule.belongsToMany(Employee, {
        as: 'AppointmentExecutants',
        through: Appointment,
        foreignKey: 'schedule',
        otherKey: 'executant',
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

    Schedule.belongsToMany(Patient, {
        as: 'AppointmentPatients',
        through: Appointment,
        foreignKey: 'schedule',
        otherKey: 'patient',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Schedule.belongsToMany(Employee, {
        as: 'AppointmentRequesters',
        through: Appointment,
        foreignKey: 'schedule',
        otherKey: 'requester',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Schedule.belongsToMany(Specialty, {
        as: 'AppointmentSpecialties',
        through: Appointment,
        foreignKey: 'schedule',
        otherKey: 'specialty',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Schedule.belongsToMany(Subspecialty, {
        as: 'AppointmentSubspecialties',
        through: Appointment,
        foreignKey: 'schedule',
        otherKey: 'subspecialty',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
