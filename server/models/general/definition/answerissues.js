'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Answerissue', {
        answerissues: {
            type: DataTypes.BIGINT,
            field: 'answerissues',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        entity: {
            type: DataTypes.BIGINT,
            field: 'entity',
            allowNull: false
        },
        interview: {
            type: DataTypes.BIGINT,
            field: 'interview',
            allowNull: false,
            references: {
                model: 'interview',
                key: 'interview'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
        },
        quizissues: {
            type: DataTypes.BIGINT,
            field: 'quizissues',
            allowNull: false,
            references: {
                model: 'quizissues',
                key: 'quizissues'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
        },
        answer: {
            type: DataTypes.STRING(200),
            field: 'answer',
            allowNull: false
        },
        Block: {
            type: DataTypes.CHAR(1),
            field: '_block',
            allowNull: true
        }
    }, {
        schema: 'general',
        tableName: 'answerissues',
        timestamps: false
    });
};

module.exports.initRelations = function() {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
    var model = require('../index');
    var Answerissue = model.Answerissue;
    var Interview = model.Interview;
    var Quizissue = model.Quizissue;

    Answerissue.belongsTo(Interview, {
        as: 'RelatedInterview',
        foreignKey: 'interview',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Answerissue.belongsTo(Quizissue, {
        as: 'RelatedQuizissue',
        foreignKey: 'quizissues',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
