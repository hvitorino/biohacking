'use strict';
module.exports = function(sequelize, DataTypes) {
  var Activity = sequelize.define('Activity', {
    secret: DataTypes.BOOLEAN,
    description: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        Activity.belongsTo(models.Kind);
        Activity.belongsTo(models.User);
      }
    }
  });
  return Activity;
};
