'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Employeeoccupation', {
        employeeoccupation: {
            type: DataTypes.BIGINT,
            field: 'employeeoccupation',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        entity: {
            type: DataTypes.BIGINT,
            field: 'entity',
            allowNull: false
        },
        localemployee: {
            type: DataTypes.BIGINT,
            field: 'localemployee',
            allowNull: false,
            references: {
                model: 'localemployee',
                key: 'localemployee'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
        },
        occupation: {
            type: DataTypes.BIGINT,
            field: 'occupation',
            allowNull: false
        },
        Block: {
            type: DataTypes.CHAR(1),
            field: '_block',
            allowNull: true
        }
    }, {
        schema: 'general',
        tableName: 'employeeoccupation',
        timestamps: false
    });
};

module.exports.initRelations = function() {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
    var model = require('../index');
    var Employeeoccupation = model.Employeeoccupation;
    var Localemployee = model.Localemployee;

    Employeeoccupation.belongsTo(Localemployee, {
        as: 'RelatedLocalemployee',
        foreignKey: 'localemployee',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
