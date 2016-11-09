'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Treatment', {
        treatment: {
            type: DataTypes.BIGINT,
            field: 'treatment',
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
        interview: {
            type: DataTypes.BIGINT,
            field: 'interview',
            allowNull: false,
            references: {
                model: 'interview',
                key: 'interview'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
        },
        patient: {
            type: DataTypes.BIGINT,
            field: 'patient',
            allowNull: false,
            references: {
                model: 'patient',
                key: 'patient'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
        },
        diagnosis: {
            type: DataTypes.STRING(4),
            field: 'diagnosis',
            allowNull: false
        },
        remark: {
            type: DataTypes.TEXT,
            field: 'remark',
            allowNull: false
        },
        Block: {
            type: DataTypes.CHAR(1),
            field: '_block',
            allowNull: true
        }
    }, {
        schema: 'general',
        tableName: 'treatment',
        timestamps: false
    });
};

module.exports.initRelations = function() {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
    var model = require('../index');
    var Treatment = model.Treatment;
    var Entity = model.Entity;
    var Interview = model.Interview;
    var Patient = model.Patient;

    Treatment.belongsTo(Entity, {
        as: 'RelatedEntity',
        foreignKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Treatment.belongsTo(Interview, {
        as: 'RelatedInterview',
        foreignKey: 'interview',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Treatment.belongsTo(Patient, {
        as: 'RelatedPatient',
        foreignKey: 'patient',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
