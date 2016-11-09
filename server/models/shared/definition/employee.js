'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Employee', {
        employee: {
            type: DataTypes.BIGINT,
            field: 'employee',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        person: {
            type: DataTypes.BIGINT,
            field: 'person',
            allowNull: false,
            references: {
                model: 'person',
                key: 'person'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
        },
        occupation: {
            type: DataTypes.BIGINT,
            field: 'occupation',
            allowNull: false,
            references: {
                model: 'occupation',
                key: 'occupation'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
        },
        professionalid: {
            type: DataTypes.STRING(30),
            field: 'professionalid',
            allowNull: true
        },
        Block: {
            type: DataTypes.CHAR(1),
            field: '_block',
            allowNull: true
        }
    }, {
        schema: 'shared',
        tableName: 'employee',
        timestamps: false
    });
};

module.exports.initRelations = function() {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
    var model = require('../index');
    var Employee = model.Employee;
    var Occupation = model.Occupation;
    var Person = model.Person;

    Employee.belongsTo(Occupation, {
        as: 'RelatedOccupation',
        foreignKey: 'occupation',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Employee.belongsTo(Person, {
        as: 'RelatedPerson',
        foreignKey: 'person',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
