'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Legalentity', {
        legalentity: {
            type: DataTypes.BIGINT,
            field: 'legalentity',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        legalid: {
            type: DataTypes.STRING(30),
            field: 'legalid',
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(100),
            field: 'name',
            allowNull: false
        },
        nickname: {
            type: DataTypes.STRING(100),
            field: 'nickname',
            allowNull: false
        },
        normalname: {
            type: DataTypes.STRING(100),
            field: 'normalname',
            allowNull: false
        },
        soundex: {
            type: DataTypes.STRING(100),
            field: 'soundex',
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            field: 'email',
            allowNull: true
        },
        Block: {
            type: DataTypes.CHAR(1),
            field: '_block',
            allowNull: true
        }
    }, {
        schema: 'shared',
        tableName: 'legalentity',
        timestamps: false
    });
};

module.exports.initRelations = function() {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
    var model = require('../index');
    var Legalentity = model.Legalentity;
    var Institution = model.Institution;

    Legalentity.hasMany(Institution, {
        as: 'FkinstitutionLegs',
        foreignKey: 'legalentity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
