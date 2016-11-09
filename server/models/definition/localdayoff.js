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
            allowNull: false,
            references: {
                model: 'entity',
                key: 'entity'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
        },
        dayoff: {
            type: DataTypes.BIGINT,
            field: 'dayoff',
            allowNull: false,
            references: {
                model: 'dayoff',
                key: 'dayoff'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
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
    var Dayoff = model.Dayoff;
    var Entity = model.Entity;

    Localdayoff.belongsTo(Dayoff, {
        as: 'RelatedDayoff',
        foreignKey: 'dayoff',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Localdayoff.belongsTo(Entity, {
        as: 'RelatedEntity',
        foreignKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
