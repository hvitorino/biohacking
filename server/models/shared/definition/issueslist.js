'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Issueslist', {
        issueslist: {
            type: DataTypes.BIGINT,
            field: 'issueslist',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING(100),
            field: 'title',
            allowNull: false
        },
        typeof: {
            type: DataTypes.CHAR(1),
            field: 'typeof',
            allowNull: false,
            defaultValue: "O"
        },
        valueslist: {
            type: DataTypes.STRING(200),
            field: 'valueslist',
            allowNull: true
        },
        valuerange: {
            type: DataTypes.STRING(200),
            field: 'valuerange',
            allowNull: true
        },
        orientation: {
            type: DataTypes.TEXT,
            field: 'orientation',
            allowNull: true
        },
        normal: {
            type: DataTypes.STRING(100),
            field: 'normal',
            allowNull: true
        },
        Block: {
            type: DataTypes.CHAR(1),
            field: '_block',
            allowNull: true
        }
    }, {
        schema: 'shared',
        tableName: 'issueslist',
        timestamps: false
    });
};

module.exports.initRelations = function() {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
    var model = require('../index');
    var Issueslist = model.Issueslist;

};
