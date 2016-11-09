const fs        = require('fs');
const path      = require('path');
const basename  = path.basename(module.filename);

module.exports = (app, models) => {
  const routers       = {};
  fs.readdirSync(path.resolve('server', 'api'))
    .filter(function(file) {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(function(file) {
      const Model = require(path.join(__dirname, file));
      new Model(app, models);
    });
    return routers;
}
