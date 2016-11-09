'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Icd', {
        icd: {
            type: DataTypes.STRING(4),
            field: 'icd',
            allowNull: false,
            primaryKey: true
        },
        description: {
            type: DataTypes.STRING(350),
            field: 'description',
            allowNull: false
        },
        icdcategory: {
            type: DataTypes.CHAR(3),
            field: 'icdcategory',
            allowNull: false,
            references: {
                model: 'icdcategory',
                key: 'icdcategory'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
        },
        typeof: {
            type: DataTypes.CHAR(1),
            field: 'typeof',
            allowNull: false,
            defaultValue: "I"
        },
        Block: {
            type: DataTypes.CHAR(1),
            field: '_block',
            allowNull: true
        }
    }, {
        schema: 'shared',
        tableName: 'icd',
        timestamps: false
    });
};

module.exports.initRelations = function() {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
    var model = require('../index');
    var Icd = model.Icd;
    var Icdcategory = model.Icdcategory;

    Icd.belongsTo(Icdcategory, {
        as: 'RelatedIcdcategory',
        foreignKey: 'icdcategory',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
