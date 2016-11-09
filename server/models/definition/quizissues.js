'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Quizissue', {
        quizissues: {
            type: DataTypes.BIGINT,
            field: 'quizissues',
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
        quiz: {
            type: DataTypes.BIGINT,
            field: 'quiz',
            allowNull: false,
            references: {
                model: 'quiz',
                key: 'quiz'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
        },
        issueslist: {
            type: DataTypes.BIGINT,
            field: 'issueslist',
            allowNull: false,
            references: {
                model: 'issueslist',
                key: 'issueslist'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
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
        tableName: 'quizissues',
        timestamps: false
    });
};

module.exports.initRelations = function() {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
    var model = require('../index');
    var Quizissue = model.Quizissue;
    var Answerissue = model.Answerissue;
    var Entity = model.Entity;
    var Issueslist = model.Issueslist;
    var Quiz = model.Quiz;
    var Interview = model.Interview;

    Quizissue.hasMany(Answerissue, {
        as: 'FkanswerissuesQuis',
        foreignKey: 'quizissues',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Quizissue.belongsTo(Entity, {
        as: 'RelatedEntity',
        foreignKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Quizissue.belongsTo(Issueslist, {
        as: 'RelatedIssueslist',
        foreignKey: 'issueslist',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Quizissue.belongsTo(Quiz, {
        as: 'RelatedQuiz',
        foreignKey: 'quiz',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Quizissue.belongsToMany(Entity, {
        as: 'AnswerissueEntities',
        through: Answerissue,
        foreignKey: 'quizissues',
        otherKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Quizissue.belongsToMany(Interview, {
        as: 'AnswerissueInterviews',
        through: Answerissue,
        foreignKey: 'quizissues',
        otherKey: 'interview',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
