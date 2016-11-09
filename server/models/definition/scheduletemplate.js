'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Scheduletemplate', {
        scheduletemplate: {
            type: DataTypes.BIGINT,
            field: 'scheduletemplate',
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
        schedulegroupid: {
            type: DataTypes.BIGINT,
            field: 'schedulegroupid',
            allowNull: false,
            autoIncrement: true
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
        startdate: {
            type: DataTypes.DATEONLY,
            field: 'startdate',
            allowNull: false
        },
        enddate: {
            type: DataTypes.DATEONLY,
            field: 'enddate',
            allowNull: true
        },
        dayofweek: {
            type: DataTypes.DECIMAL(1),
            field: 'dayofweek',
            allowNull: false
        },
        starttime: {
            type: DataTypes.TIME,
            field: 'starttime',
            allowNull: false
        },
        endtime: {
            type: DataTypes.TIME,
            field: 'endtime',
            allowNull: false
        },
        quantity: {
            type: DataTypes.DECIMAL(3),
            field: 'quantity',
            allowNull: false
        },
        Block: {
            type: DataTypes.CHAR(1),
            field: '_block',
            allowNull: true
        }
    }, {
        schema: 'outpatient',
        tableName: 'scheduletemplate',
        timestamps: false
    });
};

module.exports.initRelations = function() {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
    var model = require('../index');
    var Scheduletemplate = model.Scheduletemplate;
    var Schedule = model.Schedule;
    var Schedulespecialty = model.Schedulespecialty;
    var Employee = model.Employee;
    var Entity = model.Entity;
    var Office = model.Office;
    var Specialty = model.Specialty;
    var Subspecialty = model.Subspecialty;

    Scheduletemplate.hasMany(Schedule, {
        as: 'FkscheduleSches',
        foreignKey: 'scheduletemplate',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Scheduletemplate.hasMany(Schedulespecialty, {
        as: 'FkschedulespecialtyOffs',
        foreignKey: 'scheduletemplate',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Scheduletemplate.belongsTo(Employee, {
        as: 'RelatedEmployee',
        foreignKey: 'employee',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Scheduletemplate.belongsTo(Entity, {
        as: 'RelatedEntity',
        foreignKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Scheduletemplate.belongsTo(Office, {
        as: 'RelatedOffice',
        foreignKey: 'office',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Scheduletemplate.belongsToMany(Employee, {
        as: 'ScheduleEmployees',
        through: Schedule,
        foreignKey: 'scheduletemplate',
        otherKey: 'employee',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Scheduletemplate.belongsToMany(Entity, {
        as: 'ScheduleEntities',
        through: Schedule,
        foreignKey: 'scheduletemplate',
        otherKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Scheduletemplate.belongsToMany(Office, {
        as: 'ScheduleOffices',
        through: Schedule,
        foreignKey: 'scheduletemplate',
        otherKey: 'office',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Scheduletemplate.belongsToMany(Specialty, {
        as: 'ScheduleSpecialties',
        through: Schedule,
        foreignKey: 'scheduletemplate',
        otherKey: 'specialty',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Scheduletemplate.belongsToMany(Subspecialty, {
        as: 'ScheduleSubspecialties',
        through: Schedule,
        foreignKey: 'scheduletemplate',
        otherKey: 'subspecialty',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Scheduletemplate.belongsToMany(Entity, {
        as: 'SchedulespecialtyEntities',
        through: Schedulespecialty,
        foreignKey: 'scheduletemplate',
        otherKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Scheduletemplate.belongsToMany(Specialty, {
        as: 'SchedulespecialtySpecialties',
        through: Schedulespecialty,
        foreignKey: 'scheduletemplate',
        otherKey: 'specialty',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Scheduletemplate.belongsToMany(Subspecialty, {
        as: 'SchedulespecialtySubspecialties',
        through: Schedulespecialty,
        foreignKey: 'scheduletemplate',
        otherKey: 'subspecialty',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
