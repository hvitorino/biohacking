'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Occupation', {
        occupation: {
            type: DataTypes.BIGINT,
            field: 'occupation',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        description: {
            type: DataTypes.STRING(150),
            field: 'description',
            allowNull: false
        },
        occupationgroup: {
            type: DataTypes.BIGINT,
            field: 'occupationgroup',
            allowNull: false,
            references: {
                model: 'occupationgroup',
                key: 'occupationgroup'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
        },
        matchcode: {
            type: DataTypes.HSTORE,
            field: 'matchcode',
            allowNull: true
        },
        Block: {
            type: DataTypes.CHAR(1),
            field: '_block',
            allowNull: true
        }
    }, {
        schema: 'shared',
        tableName: 'occupation',
        timestamps: false
    });
};

module.exports.initRelations = function() {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
    var model = require('../index');
    var Occupation = model.Occupation;
    var Employee = model.Employee;
    var Occupationgroup = model.Occupationgroup;
    var Person = model.Person;

    Occupation.hasMany(Employee, {
        as: 'FkemployeeOccs',
        foreignKey: 'occupation',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Occupation.belongsTo(Occupationgroup, {
        as: 'RelatedOccupationgroup',
        foreignKey: 'occupationgroup',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Occupation.belongsToMany(Person, {
        as: 'EmployeePeople',
        through: Employee,
        foreignKey: 'occupation',
        otherKey: 'person',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
