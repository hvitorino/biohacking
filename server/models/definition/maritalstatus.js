'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Maritalstatus', {
        maritalstatus: {
            type: DataTypes.BIGINT,
            field: 'maritalstatus',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        description: {
            type: DataTypes.STRING(100),
            field: 'description',
            allowNull: false
        },
        typeof: {
            type: DataTypes.CHAR(1),
            field: 'typeof',
            allowNull: false,
            defaultValue: "S"
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
        tableName: 'maritalstatus',
        timestamps: false
    });
};

module.exports.initRelations = function() {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
    var model = require('../index');
    var Maritalstatus = model.Maritalstatus;
    var Person = model.Person;
    var Sex = model.Sex;

    Maritalstatus.hasMany(Person, {
        as: 'FkpersonMars',
        foreignKey: 'maritalstatus',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Maritalstatus.belongsToMany(Sex, {
        as: 'PersonSexes',
        through: Person,
        foreignKey: 'maritalstatus',
        otherKey: 'sex',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
