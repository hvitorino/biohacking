'use strict';

var model = {};
var initialized = false;

function init(sequelize) {
    delete module.exports.init; // Destroy itself to prevent repeated calls and clash with a model named 'init'.
    initialized = true;
    // Import model files and assign them to `model` object.
    model.Appuser = sequelize.import('./definition/appuser.js');
    model.Entity = sequelize.import('./definition/entity.js');

    // All models are initialized. Now connect them with relations.
    require('./definition/appuser.js').initRelations();
    require('./definition/entity.js').initRelations();
    return model;
}

// Note: While using this module, DO NOT FORGET FIRST CALL model.init(sequelize). Otherwise you get undefined.
module.exports = model;
module.exports.init = init;
module.exports.isInitialized = initialized;
