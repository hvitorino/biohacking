'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Person', {
        person: {
            type: DataTypes.BIGINT,
            field: 'person',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        sex: {
            type: DataTypes.BIGINT,
            field: 'sex',
            allowNull: false,
            references: {
                model: 'sex',
                key: 'sex'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
        },
        name: {
            type: DataTypes.STRING(100),
            field: 'name',
            allowNull: false
        },
        socialname: {
            type: DataTypes.STRING(100),
            field: 'socialname',
            allowNull: false
        },
        nickname: {
            type: DataTypes.STRING(100),
            field: 'nickname',
            allowNull: false
        },
        normalname: {
            type: DataTypes.STRING(100),
            field: 'normalname',
            allowNull: false
        },
        soundex: {
            type: DataTypes.STRING(100),
            field: 'soundex',
            allowNull: false
        },
        birthdate: {
            type: DataTypes.DATEONLY,
            field: 'birthdate',
            allowNull: false
        },
        mothersname: {
            type: DataTypes.STRING(100),
            field: 'mothersname',
            allowNull: false
        },
        fathersname: {
            type: DataTypes.STRING(100),
            field: 'fathersname',
            allowNull: true
        },
        spousesname: {
            type: DataTypes.STRING(100),
            field: 'spousesname',
            allowNull: true
        },
        taxid: {
            type: DataTypes.STRING(30),
            field: 'taxid',
            allowNull: true
        },
        idcard: {
            type: DataTypes.STRING(30),
            field: 'idcard',
            allowNull: true
        },
        issuingauthority: {
            type: DataTypes.STRING(30),
            field: 'issuingauthority',
            allowNull: true
        },
        issuingdate: {
            type: DataTypes.DATEONLY,
            field: 'issuingdate',
            allowNull: true
        },
        expirydate: {
            type: DataTypes.DATEONLY,
            field: 'expirydate',
            allowNull: true
        },
        medicalid: {
            type: DataTypes.STRING(30),
            field: 'medicalid',
            allowNull: true
        },
        maritalstatus: {
            type: DataTypes.BIGINT,
            field: 'maritalstatus',
            allowNull: true,
            references: {
                model: 'maritalstatus',
                key: 'maritalstatus'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
        },
        email: {
            type: DataTypes.STRING(100),
            field: 'email',
            allowNull: true
        },
        deathdate: {
            type: DataTypes.DATEONLY,
            field: 'deathdate',
            allowNull: true
        },
        Block: {
            type: DataTypes.CHAR(1),
            field: '_block',
            allowNull: true
        }
    }, {
        schema: 'shared',
        tableName: 'person',
        timestamps: false
    });
};

module.exports.initRelations = function() {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
    var model = require('../index');
    var Person = model.Person;
    var Employee = model.Employee;
    var Maritalstatus = model.Maritalstatus;
    var Sex = model.Sex;
    var Occupation = model.Occupation;

    Person.hasMany(Employee, {
        as: 'FkemployeePers',
        foreignKey: 'person',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Person.belongsTo(Maritalstatus, {
        as: 'RelatedMaritalstatus',
        foreignKey: 'maritalstatus',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Person.belongsTo(Sex, {
        as: 'RelatedSex',
        foreignKey: 'sex',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Person.belongsToMany(Occupation, {
        as: 'EmployeeOccupations',
        through: Employee,
        foreignKey: 'person',
        otherKey: 'occupation',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
