'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Entityemployee', {
        entityemployee: {
            type: DataTypes.BIGINT,
            field: 'entityemployee',
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
        employeeid: {
            type: DataTypes.STRING(30),
            field: 'employeeid',
            allowNull: false
        },
        admissiondate: {
            type: DataTypes.DATEONLY,
            field: 'admissiondate',
            allowNull: false
        },
        resignationdate: {
            type: DataTypes.DATEONLY,
            field: 'resignationdate',
            allowNull: true
        },
        Block: {
            type: DataTypes.CHAR(1),
            field: '_block',
            allowNull: true
        }
    }, {
        schema: 'general',
        tableName: 'entityemployee',
        timestamps: false
    });
};

module.exports.initRelations = function() {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
    var model = require('../index');
    var Entityemployee = model.Entityemployee;
    var Employee = model.Employee;
    var Entity = model.Entity;

    Entityemployee.belongsTo(Employee, {
        as: 'RelatedEmployee',
        foreignKey: 'employee',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Entityemployee.belongsTo(Entity, {
        as: 'RelatedEntity',
        foreignKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
