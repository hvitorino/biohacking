'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Entity', {
        entity: {
            type: DataTypes.BIGINT,
            field: 'entity',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        entityid: {
            type: DataTypes.INTEGER,
            field: 'entityid',
            allowNull: false
        },
        institution: {
            type: DataTypes.BIGINT,
            field: 'institution',
            allowNull: true
        },
        Block: {
            type: DataTypes.CHAR(1),
            field: '_block',
            allowNull: true
        }
    }, {
        schema: 'public',
        tableName: 'entity',
        timestamps: false
    });
};

module.exports.initRelations = function() {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
    var model = require('../index');
    var Entity = model.Entity;
    var Appuser = model.Appuser;

    Entity.hasMany(Appuser, {
        as: 'FkappuserEnts',
        foreignKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
