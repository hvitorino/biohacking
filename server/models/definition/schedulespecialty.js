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
            allowNull: false,
            references: {
                model: 'entity',
                key: 'entity'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
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
        specialty: {
            type: DataTypes.BIGINT,
            field: 'specialty',
            allowNull: false,
            references: {
                model: 'specialty',
                key: 'specialty'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
        },
        subspecialty: {
            type: DataTypes.BIGINT,
            field: 'subspecialty',
            allowNull: true,
            references: {
                model: 'subspecialty',
                key: 'subspecialty'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
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
    var Entity = model.Entity;
    var Scheduletemplate = model.Scheduletemplate;
    var Specialty = model.Specialty;
    var Subspecialty = model.Subspecialty;

    Schedulespecialty.belongsTo(Entity, {
        as: 'RelatedEntity',
        foreignKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Schedulespecialty.belongsTo(Scheduletemplate, {
        as: 'RelatedScheduletemplate',
        foreignKey: 'scheduletemplate',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Schedulespecialty.belongsTo(Specialty, {
        as: 'RelatedSpecialty',
        foreignKey: 'specialty',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Schedulespecialty.belongsTo(Subspecialty, {
        as: 'RelatedSubspecialty',
        foreignKey: 'subspecialty',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
