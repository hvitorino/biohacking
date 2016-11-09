'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Quizemployee', {
        quizemployee: {
            type: DataTypes.BIGINT,
            field: 'quizemployee',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        entity: {
            type: DataTypes.BIGINT,
            field: 'entity',
            allowNull: false
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
        localemployee: {
            type: DataTypes.BIGINT,
            field: 'localemployee',
            allowNull: false,
            references: {
                model: 'localemployee',
                key: 'localemployee'
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
        tableName: 'quizemployee',
        timestamps: false
    });
};

module.exports.initRelations = function() {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
    var model = require('../index');
    var Quizemployee = model.Quizemployee;
    var Localemployee = model.Localemployee;
    var Quiz = model.Quiz;

    Quizemployee.belongsTo(Localemployee, {
        as: 'RelatedLocalemployee',
        foreignKey: 'localemployee',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Quizemployee.belongsTo(Quiz, {
        as: 'RelatedQuiz',
        foreignKey: 'quiz',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
