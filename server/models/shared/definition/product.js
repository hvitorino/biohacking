'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Product', {
        product: {
            type: DataTypes.BIGINT,
            field: 'product',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        description: {
            type: DataTypes.STRING(150),
            field: 'description',
            allowNull: false
        },
        alias: {
            type: DataTypes.STRING(150),
            field: 'alias',
            allowNull: true
        },
        productgroup: {
            type: DataTypes.BIGINT,
            field: 'productgroup',
            allowNull: false
        },
        alternativegroup: {
            type: DataTypes.BIGINT,
            field: 'alternativegroup',
            allowNull: true
        },
        productunit: {
            type: DataTypes.BIGINT,
            field: 'productunit',
            allowNull: false
        },
        dosage: {
            type: DataTypes.STRING(50),
            field: 'dosage',
            allowNull: true
        },
        unitdose: {
            type: DataTypes.BIGINT,
            field: 'unitdose',
            allowNull: true
        },
        Block: {
            type: DataTypes.CHAR(1),
            field: '_block',
            allowNull: true
        }
    }, {
        schema: 'shared',
        tableName: 'product',
        timestamps: false
    });
};

module.exports.initRelations = function() {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
    var model = require('../index');
    var Product = model.Product;

};
