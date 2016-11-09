'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Productgroup', {
        productgroup: {
            type: DataTypes.BIGINT,
            field: 'productgroup',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        description: {
            type: DataTypes.STRING(150),
            field: 'description',
            allowNull: false
        },
        parent: {
            type: DataTypes.BIGINT,
            field: 'parent',
            allowNull: true
        },
        isleaf: {
            type: DataTypes.BOOLEAN,
            field: 'isleaf',
            allowNull: false
        },
        Block: {
            type: DataTypes.CHAR(1),
            field: '_block',
            allowNull: true
        }
    }, {
        schema: 'shared',
        tableName: 'productgroup',
        timestamps: false
    });
};

module.exports.initRelations = function() {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
    var model = require('../index');
    var Productgroup = model.Productgroup;

};
