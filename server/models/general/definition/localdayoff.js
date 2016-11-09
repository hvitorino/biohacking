'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Localdayoff', {
        localdayoff: {
            type: DataTypes.BIGINT,
            field: 'localdayoff',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        entity: {
            type: DataTypes.BIGINT,
            field: 'entity',
            allowNull: false
        },
        dayoff: {
            type: DataTypes.BIGINT,
            field: 'dayoff',
            allowNull: false
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
        schema: 'general',
        tableName: 'localdayoff',
        timestamps: false
    });
};

module.exports.initRelations = function() {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
    var model = require('../index');
    var Localdayoff = model.Localdayoff;

};
