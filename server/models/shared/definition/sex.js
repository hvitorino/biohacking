'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Sex', {
        sex: {
            type: DataTypes.BIGINT,
            field: 'sex',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        description: {
            type: DataTypes.STRING(100),
            field: 'description',
            allowNull: false
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
        tableName: 'sex',
        timestamps: false
    });
};

module.exports.initRelations = function() {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
    var model = require('../index');
    var Sex = model.Sex;
    var Person = model.Person;
    var Maritalstatus = model.Maritalstatus;

    Sex.hasMany(Person, {
        as: 'FkpersonSexes',
        foreignKey: 'sex',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Sex.belongsToMany(Maritalstatus, {
        as: 'PersonMaritalstatuses',
        through: Person,
        foreignKey: 'sex',
        otherKey: 'maritalstatus',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
