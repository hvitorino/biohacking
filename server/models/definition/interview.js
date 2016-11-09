'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Interview', {
        interview: {
            type: DataTypes.BIGINT,
            field: 'interview',
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
        employee: {
            type: DataTypes.BIGINT,
            field: 'employee',
            allowNull: false,
            references: {
                model: 'employee',
                key: 'employee'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
        },
        interviewdate: {
            type: DataTypes.DATE,
            field: 'interviewdate',
            allowNull: false
        },
        interviewstatus: {
            type: DataTypes.CHAR(1),
            field: 'interviewstatus',
            allowNull: false,
            defaultValue: "S"
        },
        typeof: {
            type: DataTypes.CHAR(1),
            field: 'typeof',
            allowNull: false,
            defaultValue: "F"
        },
        localof: {
            type: DataTypes.CHAR(1),
            field: 'localof',
            allowNull: false,
            defaultValue: "O"
        },
        lockey: {
            type: DataTypes.HSTORE,
            field: 'lockey',
            allowNull: true
        },
        Block: {
            type: DataTypes.CHAR(1),
            field: '_block',
            allowNull: true
        }
    }, {
        schema: 'general',
        tableName: 'interview',
        timestamps: false
    });
};

module.exports.initRelations = function() {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
    var model = require('../index');
    var Interview = model.Interview;
    var Anamnesis = model.Anamnesis;
    var Answerissue = model.Answerissue;
    var Reevaluation = model.Reevaluation;
    var Treatment = model.Treatment;
    var Followup = model.Followup;
    var Employee = model.Employee;
    var Entity = model.Entity;
    var Patient = model.Patient;
    var Quiz = model.Quiz;
    var Quizissue = model.Quizissue;

    Interview.hasMany(Anamnesis, {
        as: 'FkanamnesisInts',
        foreignKey: 'interview',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Interview.hasMany(Answerissue, {
        as: 'FkanswerissuesInts',
        foreignKey: 'interview',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Interview.hasMany(Reevaluation, {
        as: 'FkreevaluationInts',
        foreignKey: 'interview',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Interview.hasMany(Treatment, {
        as: 'FktreatmentInts',
        foreignKey: 'interview',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Interview.hasMany(Followup, {
        as: 'FkfollowupInts',
        foreignKey: 'interview',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Interview.belongsTo(Employee, {
        as: 'RelatedEmployee',
        foreignKey: 'employee',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Interview.belongsTo(Entity, {
        as: 'RelatedEntity',
        foreignKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Interview.belongsTo(Patient, {
        as: 'RelatedPatient',
        foreignKey: 'patient',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Interview.belongsToMany(Entity, {
        as: 'AnamnesisEntities',
        through: Anamnesis,
        foreignKey: 'interview',
        otherKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Interview.belongsToMany(Patient, {
        as: 'AnamnesisPatients',
        through: Anamnesis,
        foreignKey: 'interview',
        otherKey: 'patient',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Interview.belongsToMany(Quiz, {
        as: 'AnamnesisQuizzes',
        through: Anamnesis,
        foreignKey: 'interview',
        otherKey: 'quiz',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Interview.belongsToMany(Entity, {
        as: 'AnswerissueEntities',
        through: Answerissue,
        foreignKey: 'interview',
        otherKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Interview.belongsToMany(Quizissue, {
        as: 'AnswerissueQuizissues',
        through: Answerissue,
        foreignKey: 'interview',
        otherKey: 'quizissues',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Interview.belongsToMany(Entity, {
        as: 'ReevaluationEntities',
        through: Reevaluation,
        foreignKey: 'interview',
        otherKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Interview.belongsToMany(Patient, {
        as: 'ReevaluationPatients',
        through: Reevaluation,
        foreignKey: 'interview',
        otherKey: 'patient',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Interview.belongsToMany(Entity, {
        as: 'TreatmentEntities',
        through: Treatment,
        foreignKey: 'interview',
        otherKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Interview.belongsToMany(Patient, {
        as: 'TreatmentPatients',
        through: Treatment,
        foreignKey: 'interview',
        otherKey: 'patient',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Interview.belongsToMany(Entity, {
        as: 'FollowupEntities',
        through: Followup,
        foreignKey: 'interview',
        otherKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Interview.belongsToMany(Patient, {
        as: 'FollowupPatients',
        through: Followup,
        foreignKey: 'interview',
        otherKey: 'patient',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Interview.belongsToMany(Quiz, {
        as: 'FollowupQuizzes',
        through: Followup,
        foreignKey: 'interview',
        otherKey: 'quiz',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
