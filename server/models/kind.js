'use strict';
module.exports = function(sequelize, DataTypes) {
  var Kind = sequelize.define('Kind', {
    color: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Kind;
};