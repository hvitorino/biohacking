

module.exports = function (sequelize, DataTypes) {
  const Activity = sequelize.define('Activity', {
    secret: DataTypes.BOOLEAN,
    loggedAt: DataTypes.DATE,
    description: DataTypes.TEXT,
  }, {
    classMethods: {
      associate(models) {
        Activity.belongsTo(models.Kind);
        Activity.belongsTo(models.User);
      },
    },
  });
  return Activity;
};
