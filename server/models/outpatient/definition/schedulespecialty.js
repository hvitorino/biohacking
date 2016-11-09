'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Schedulespecialty', {
        schedulespecialty: {
            type: DataTypes.BIGINT,
            field: 'schedulespecialty',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        entity: {
            type: DataTypes.BIGINT,
            field: 'entity',
            allowNull: false
        },
        scheduletemplate: {
            type: DataTypes.BIGINT,
            field: 'scheduletemplate',
            allowNull: false,
            references: {
                model: 'scheduletemplate',
                key: 'scheduletemplate'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
        },
        localspecialty: {
            type: DataTypes.BIGINT,
            field: 'localspecialty',
            allowNull: false
        },
        subspecialty: {
            type: DataTypes.BIGINT,
            field: 'subspecialty',
            allowNull: true
        },
        Block: {
            type: DataTypes.CHAR(1),
            field: '_block',
            allowNull: true
        }
    }, {
        schema: 'outpatient',
        tableName: 'schedulespecialty',
        timestamps: false
    });
};

module.exports.initRelations = function() {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
    var model = require('../index');
    var Schedulespecialty = model.Schedulespecialty;
    var Scheduletemplate = model.Scheduletemplate;

    Schedulespecialty.belongsTo(Scheduletemplate, {
        as: 'RelatedScheduletemplate',
        foreignKey: 'scheduletemplate',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
