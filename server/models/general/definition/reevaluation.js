'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Reevaluation', {
        reevaluation: {
            type: DataTypes.BIGINT,
            field: 'reevaluation',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        entity: {
            type: DataTypes.BIGINT,
            field: 'entity',
            allowNull: false
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
        diagnosisupdate: {
            type: DataTypes.STRING(4),
            field: 'diagnosisupdate',
            allowNull: false
        },
        remark: {
            type: DataTypes.TEXT,
            field: 'remark',
            allowNull: false
        },
        dischargedate: {
            type: DataTypes.DATEONLY,
            field: 'dischargedate',
            allowNull: true
        },
        Block: {
            type: DataTypes.CHAR(1),
            field: '_block',
            allowNull: true
        }
    }, {
        schema: 'general',
        tableName: 'reevaluation',
        timestamps: false
    });
};

module.exports.initRelations = function() {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
    var model = require('../index');
    var Reevaluation = model.Reevaluation;
    var Interview = model.Interview;
    var Patient = model.Patient;

    Reevaluation.belongsTo(Interview, {
        as: 'RelatedInterview',
        foreignKey: 'interview',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Reevaluation.belongsTo(Patient, {
        as: 'RelatedPatient',
        foreignKey: 'patient',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
