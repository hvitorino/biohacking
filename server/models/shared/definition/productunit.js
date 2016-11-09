'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Productunit', {
        productunit: {
            type: DataTypes.BIGINT,
            field: 'productunit',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        description: {
            type: DataTypes.STRING(100),
            field: 'description',
            allowNull: false
        },
        nick: {
            type: DataTypes.STRING(20),
            field: 'nick',
            allowNull: false
        },
        Block: {
            type: DataTypes.CHAR(1),
            field: '_block',
            allowNull: true
        }
    }, {
        schema: 'shared',
        tableName: 'productunit',
        timestamps: false
    });
};

module.exports.initRelations = function() {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
    var model = require('../index');
    var Productunit = model.Productunit;

};
