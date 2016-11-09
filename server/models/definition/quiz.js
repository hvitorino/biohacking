'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Quiz', {
        quiz: {
            type: DataTypes.BIGINT,
            field: 'quiz',
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
        title: {
            type: DataTypes.STRING(100),
            field: 'title',
            allowNull: false
        },
        typeof: {
            type: DataTypes.CHAR(1),
            field: 'typeof',
            allowNull: false,
            defaultValue: "A"
        },
        orientation: {
            type: DataTypes.TEXT,
            field: 'orientation',
            allowNull: true
        },
        startdate: {
            type: DataTypes.DATEONLY,
            field: 'startdate',
            allowNull: false
        },
        enddate: {
            type: DataTypes.DATEONLY,
            field: 'enddate',
            allowNull: true
        },
        Block: {
            type: DataTypes.CHAR(1),
            field: '_block',
            allowNull: true
        }
    }, {
        schema: 'general',
        tableName: 'quiz',
        timestamps: false
    });
};

module.exports.initRelations = function() {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
    var model = require('../index');
    var Quiz = model.Quiz;
    var Anamnesis = model.Anamnesis;
    var Quizemployee = model.Quizemployee;
    var Quizissue = model.Quizissue;
    var Quizspecialty = model.Quizspecialty;
    var Followup = model.Followup;
    var Entity = model.Entity;
    var Interview = model.Interview;
    var Patient = model.Patient;
    var Employee = model.Employee;
    var Issueslist = model.Issueslist;
    var Specialty = model.Specialty;
    var Subspecialty = model.Subspecialty;

    Quiz.hasMany(Anamnesis, {
        as: 'FkanamnesisQuis',
        foreignKey: 'quiz',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Quiz.hasMany(Quizemployee, {
        as: 'FkquizemployeeQuis',
        foreignKey: 'quiz',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Quiz.hasMany(Quizissue, {
        as: 'FkquizissuesQuis',
        foreignKey: 'quiz',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Quiz.hasMany(Quizspecialty, {
        as: 'FkquizspecialtyQuis',
        foreignKey: 'quiz',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Quiz.hasMany(Followup, {
        as: 'FkfollowupQuis',
        foreignKey: 'quiz',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Quiz.belongsTo(Entity, {
        as: 'RelatedEntity',
        foreignKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Quiz.belongsToMany(Entity, {
        as: 'AnamnesisEntities',
        through: Anamnesis,
        foreignKey: 'quiz',
        otherKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Quiz.belongsToMany(Interview, {
        as: 'AnamnesisInterviews',
        through: Anamnesis,
        foreignKey: 'quiz',
        otherKey: 'interview',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Quiz.belongsToMany(Patient, {
        as: 'AnamnesisPatients',
        through: Anamnesis,
        foreignKey: 'quiz',
        otherKey: 'patient',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Quiz.belongsToMany(Employee, {
        as: 'QuizemployeeEmployees',
        through: Quizemployee,
        foreignKey: 'quiz',
        otherKey: 'employee',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Quiz.belongsToMany(Entity, {
        as: 'QuizemployeeEntities',
        through: Quizemployee,
        foreignKey: 'quiz',
        otherKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Quiz.belongsToMany(Entity, {
        as: 'QuizissueEntities',
        through: Quizissue,
        foreignKey: 'quiz',
        otherKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Quiz.belongsToMany(Issueslist, {
        as: 'QuizissueIssueslists',
        through: Quizissue,
        foreignKey: 'quiz',
        otherKey: 'issueslist',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Quiz.belongsToMany(Entity, {
        as: 'QuizspecialtyEntities',
        through: Quizspecialty,
        foreignKey: 'quiz',
        otherKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Quiz.belongsToMany(Specialty, {
        as: 'QuizspecialtySpecialties',
        through: Quizspecialty,
        foreignKey: 'quiz',
        otherKey: 'specialty',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Quiz.belongsToMany(Subspecialty, {
        as: 'QuizspecialtySubspecialties',
        through: Quizspecialty,
        foreignKey: 'quiz',
        otherKey: 'subspecialty',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Quiz.belongsToMany(Entity, {
        as: 'FollowupEntities',
        through: Followup,
        foreignKey: 'quiz',
        otherKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Quiz.belongsToMany(Interview, {
        as: 'FollowupInterviews',
        through: Followup,
        foreignKey: 'quiz',
        otherKey: 'interview',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Quiz.belongsToMany(Patient, {
        as: 'FollowupPatients',
        through: Followup,
        foreignKey: 'quiz',
        otherKey: 'patient',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
