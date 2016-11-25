const fs = require('fs');
const path = require('path');
const basename = path.basename(module.filename);

module.exports = (app, models) => {
  const routers = {};
  fs.readdirSync(path.resolve('server', 'api', 'routers'))
    .filter(file => (file.indexOf('.') !== 0) && (file !== 'router.js') && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach((file) => {
      const Model = require(path.join(__dirname, file));
      new Model(app, models);
    });
  return routers;
};
