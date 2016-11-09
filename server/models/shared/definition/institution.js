'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Institution', {
        institution: {
            type: DataTypes.BIGINT,
            field: 'institution',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        legalentity: {
            type: DataTypes.BIGINT,
            field: 'legalentity',
            allowNull: false,
            references: {
                model: 'legalentity',
                key: 'legalentity'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
        },
        healthid: {
            type: DataTypes.STRING(30),
            field: 'healthid',
            allowNull: false
        },
        typeof: {
            type: DataTypes.CHAR(1),
            field: 'typeof',
            allowNull: false,
            defaultValue: "H"
        },
        acronym: {
            type: DataTypes.STRING(20),
            field: 'acronym',
            allowNull: true
        },
        Block: {
            type: DataTypes.CHAR(1),
            field: '_block',
            allowNull: true
        }
    }, {
        schema: 'shared',
        tableName: 'institution',
        timestamps: false
    });
};

module.exports.initRelations = function() {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
    var model = require('../index');
    var Institution = model.Institution;
    var Legalentity = model.Legalentity;

    Institution.belongsTo(Legalentity, {
        as: 'RelatedLegalentity',
        foreignKey: 'legalentity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
