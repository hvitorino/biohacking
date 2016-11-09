'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Unitdose', {
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
            type: DataTypes.STRING(30),
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
        tableName: 'unitdose',
        timestamps: false
    });
};

module.exports.initRelations = function() {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
    var model = require('../index');
    var Unitdose = model.Unitdose;

};
