'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Employeeoccupation', {
        employeeoccupation: {
            type: DataTypes.BIGINT,
            field: 'employeeoccupation',
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
            allowNull: false,
            references: {
                model: 'employee',
                key: 'employee'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
        },
        occupation: {
            type: DataTypes.BIGINT,
            field: 'occupation',
            allowNull: false,
            references: {
                model: 'occupation',
                key: 'occupation'
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
        schema: 'general',
        tableName: 'employeeoccupation',
        timestamps: false
    });
};

module.exports.initRelations = function() {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
    var model = require('../index');
    var Employeeoccupation = model.Employeeoccupation;
    var Employee = model.Employee;
    var Entity = model.Entity;
    var Occupation = model.Occupation;

    Employeeoccupation.belongsTo(Employee, {
        as: 'RelatedEmployee',
        foreignKey: 'employee',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Employeeoccupation.belongsTo(Entity, {
        as: 'RelatedEntity',
        foreignKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Employeeoccupation.belongsTo(Occupation, {
        as: 'RelatedOccupation',
        foreignKey: 'occupation',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
