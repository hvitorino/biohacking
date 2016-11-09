'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Specialty', {
        specialty: {
            type: DataTypes.BIGINT,
            field: 'specialty',
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
            defaultValue: "A"
        },
        matchcode: {
            type: DataTypes.HSTORE,
            field: 'matchcode',
            allowNull: true
        },
        Block: {
            type: DataTypes.CHAR(1),
            field: '_block',
            allowNull: true
        }
    }, {
        schema: 'shared',
        tableName: 'specialty',
        timestamps: false
    });
};

module.exports.initRelations = function() {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
    var model = require('../index');
    var Specialty = model.Specialty;

};
