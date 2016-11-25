

module.exports = function (sequelize, DataTypes) {
  const Kind = sequelize.define('Kind', {
    color: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      },
    },
  });
  return Kind;
};
