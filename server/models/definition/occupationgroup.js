'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Occupationgroup', {
        occupationgroup: {
            type: DataTypes.BIGINT,
            field: 'occupationgroup',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        description: {
            type: DataTypes.STRING(100),
            field: 'description',
            allowNull: false
        },
        typeof: {
            type: DataTypes.CHAR(1),
            field: 'typeof',
            allowNull: false,
            defaultValue: "O"
        },
        nickname: {
            type: DataTypes.STRING(10),
            field: 'nickname',
            allowNull: true
        },
        matchcode: {
            type: DataTypes.HSTORE,
            field: 'matchcode',
            allowNull: true
        },
        Block: {
            type: DataTypes.CHAR(1),
            field: '_block',
            allowNull: true
        }
    }, {
        schema: 'shared',
        tableName: 'occupationgroup',
        timestamps: false
    });
};

module.exports.initRelations = function() {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
    var model = require('../index');
    var Occupationgroup = model.Occupationgroup;
    var Occupation = model.Occupation;

    Occupationgroup.hasMany(Occupation, {
        as: 'FkoccupationOccs',
        foreignKey: 'occupationgroup',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
