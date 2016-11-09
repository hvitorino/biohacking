'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Followup', {
        followup: {
            type: DataTypes.BIGINT,
            field: 'followup',
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
            allowNull: false
        },
        patient: {
            type: DataTypes.BIGINT,
            field: 'patient',
            allowNull: false
        },
        quiz: {
            type: DataTypes.BIGINT,
            field: 'quiz',
            allowNull: false
        },
        Block: {
            type: DataTypes.CHAR(1),
            field: '_block',
            allowNull: true
        }
    }, {
        schema: 'outpatient',
        tableName: 'followup',
        timestamps: false
    });
};

module.exports.initRelations = function() {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
    var model = require('../index');
    var Followup = model.Followup;

};
