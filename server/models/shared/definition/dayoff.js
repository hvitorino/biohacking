'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Dayoff', {
        dayoff: {
            type: DataTypes.BIGINT,
            field: 'dayoff',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        description: {
            type: DataTypes.STRING(100),
            field: 'description',
            allowNull: false
        },
        typeof: {
            type: DataTypes.CHAR(1),
            field: 'typeof',
            allowNull: false,
            defaultValue: "F"
        },
        dayoffdate: {
            type: DataTypes.DATEONLY,
            field: 'dayoffdate',
            allowNull: false
        },
        shift: {
            type: DataTypes.DECIMAL(3),
            field: 'shift',
            allowNull: true
        },
        isdayoff: {
            type: DataTypes.CHAR(1),
            field: 'isdayoff',
            allowNull: false,
            defaultValue: "N"
        },
        Block: {
            type: DataTypes.CHAR(1),
            field: '_block',
            allowNull: true
        }
    }, {
        schema: 'shared',
        tableName: 'dayoff',
        timestamps: false
    });
};

module.exports.initRelations = function() {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
    var model = require('../index');
    var Dayoff = model.Dayoff;

};
