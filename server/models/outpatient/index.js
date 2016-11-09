'use strict';

var model = {};
var initialized = false;

function init(sequelize) {
    delete module.exports.init; // Destroy itself to prevent repeated calls and clash with a model named 'init'.
    initialized = true;
    // Import model files and assign them to `model` object.
    model.Appointment = sequelize.import('./definition/appointment.js');
    model.Followup = sequelize.import('./definition/followup.js');
    model.Office = sequelize.import('./definition/office.js');
    model.Schedule = sequelize.import('./definition/schedule.js');
    model.Schedulespecialty = sequelize.import('./definition/schedulespecialty.js');
    model.Scheduletemplate = sequelize.import('./definition/scheduletemplate.js');

    // All models are initialized. Now connect them with relations.
    require('./definition/appointment.js').initRelations();
    require('./definition/followup.js').initRelations();
    require('./definition/office.js').initRelations();
    require('./definition/schedule.js').initRelations();
    require('./definition/schedulespecialty.js').initRelations();
    require('./definition/scheduletemplate.js').initRelations();
    return model;
}

// Note: While using this module, DO NOT FORGET FIRST CALL model.init(sequelize). Otherwise you get undefined.
module.exports = model;
module.exports.init = init;
module.exports.isInitialized = initialized;
