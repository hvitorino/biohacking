'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Localemployee', {
        localemployee: {
            type: DataTypes.BIGINT,
            field: 'localemployee',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        entity: {
            type: DataTypes.BIGINT,
            field: 'entity',
            allowNull: false
        },
        employee: {
            type: DataTypes.BIGINT,
            field: 'employee',
            allowNull: false
        },
        employeeid: {
            type: DataTypes.STRING(30),
            field: 'employeeid',
            allowNull: false
        },
        admissiondate: {
            type: DataTypes.DATEONLY,
            field: 'admissiondate',
            allowNull: false
        },
        resignationdate: {
            type: DataTypes.DATEONLY,
            field: 'resignationdate',
            allowNull: true
        },
        Block: {
            type: DataTypes.CHAR(1),
            field: '_block',
            allowNull: true
        }
    }, {
        schema: 'general',
        tableName: 'localemployee',
        timestamps: false
    });
};

module.exports.initRelations = function() {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
    var model = require('../index');
    var Localemployee = model.Localemployee;
    var Employeeoccupation = model.Employeeoccupation;
    var Interview = model.Interview;
    var Quizemployee = model.Quizemployee;
    var Patient = model.Patient;
    var Quiz = model.Quiz;

    Localemployee.hasMany(Employeeoccupation, {
        as: 'FkemployeeoccupationEmps',
        foreignKey: 'localemployee',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Localemployee.hasMany(Interview, {
        as: 'FkinterviewEmps',
        foreignKey: 'localemployee',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Localemployee.hasMany(Quizemployee, {
        as: 'FkquizemployeeEmps',
        foreignKey: 'localemployee',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Localemployee.belongsToMany(Patient, {
        as: 'InterviewPatients',
        through: Interview,
        foreignKey: 'localemployee',
        otherKey: 'patient',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Localemployee.belongsToMany(Quiz, {
        as: 'QuizemployeeQuizzes',
        through: Quizemployee,
        foreignKey: 'localemployee',
        otherKey: 'quiz',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
