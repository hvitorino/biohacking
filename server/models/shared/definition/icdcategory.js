'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Icdcategory', {
        icdcategory: {
            type: DataTypes.CHAR(3),
            field: 'icdcategory',
            allowNull: false,
            primaryKey: true
        },
        description: {
            type: DataTypes.STRING(300),
            field: 'description',
            allowNull: false
        },
        Block: {
            type: DataTypes.CHAR(1),
            field: '_block',
            allowNull: true
        }
    }, {
        schema: 'shared',
        tableName: 'icdcategory',
        timestamps: false
    });
};

module.exports.initRelations = function() {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
    var model = require('../index');
    var Icdcategory = model.Icdcategory;
    var Icd = model.Icd;

    Icdcategory.hasMany(Icd, {
        as: 'FkicdIcds',
        foreignKey: 'icdcategory',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
