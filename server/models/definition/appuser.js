'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Appuser', {
        appuser: {
            type: DataTypes.BIGINT,
            field: 'appuser',
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
        userid: {
            type: DataTypes.STRING(20),
            field: 'userid',
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(100),
            field: 'name',
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(100),
            field: 'password',
            allowNull: true
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
        lastupdate: {
            type: DataTypes.DATE,
            field: 'lastupdate',
            allowNull: true
        },
        lastlogin: {
            type: DataTypes.DATE,
            field: 'lastlogin',
            allowNull: true
        },
        lastattempt: {
            type: DataTypes.DATE,
            field: 'lastattempt',
            allowNull: true
        },
        attempts: {
            type: DataTypes.DECIMAL(3),
            field: 'attempts',
            allowNull: false
        },
        blocked: {
            type: DataTypes.CHAR(1),
            field: 'blocked',
            allowNull: false,
            defaultValue: "N"
        },
        stationid: {
            type: DataTypes.STRING(100),
            field: 'stationid',
            allowNull: true
        },
        Block: {
            type: DataTypes.CHAR(1),
            field: '_block',
            allowNull: true
        }
    }, {
        schema: 'public',
        tableName: 'appuser',
        timestamps: false
    });
};

module.exports.initRelations = function() {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
    var model = require('../index');
    var Appuser = model.Appuser;
    var Employee = model.Employee;
    var Entity = model.Entity;

    Appuser.belongsTo(Employee, {
        as: 'RelatedEmployee',
        foreignKey: 'employee',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Appuser.belongsTo(Entity, {
        as: 'RelatedEntity',
        foreignKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
