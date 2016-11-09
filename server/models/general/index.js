'use strict';

var model = {};
var initialized = false;

function init(sequelize) {
    delete module.exports.init; // Destroy itself to prevent repeated calls and clash with a model named 'init'.
    initialized = true;
    // Import model files and assign them to `model` object.
    model.Anamnesis = sequelize.import('./definition/anamnesis.js');
    model.Answerissue = sequelize.import('./definition/answerissues.js');
    model.Employeeoccupation = sequelize.import('./definition/employeeoccupation.js');
    model.Interview = sequelize.import('./definition/interview.js');
    model.Localdayoff = sequelize.import('./definition/localdayoff.js');
    model.Localemployee = sequelize.import('./definition/localemployee.js');
    model.Localspecialty = sequelize.import('./definition/localspecialty.js');
    model.Patient = sequelize.import('./definition/patient.js');
    model.Patientlog = sequelize.import('./definition/patientlog.js');
    model.Quiz = sequelize.import('./definition/quiz.js');
    model.Quizemployee = sequelize.import('./definition/quizemployee.js');
    model.Quizissue = sequelize.import('./definition/quizissues.js');
    model.Quizspecialty = sequelize.import('./definition/quizspecialty.js');
    model.Reevaluation = sequelize.import('./definition/reevaluation.js');
    model.Subspecialty = sequelize.import('./definition/subspecialty.js');
    model.Treatment = sequelize.import('./definition/treatment.js');

    // All models are initialized. Now connect them with relations.
    require('./definition/anamnesis.js').initRelations();
    require('./definition/answerissues.js').initRelations();
    require('./definition/employeeoccupation.js').initRelations();
    require('./definition/interview.js').initRelations();
    require('./definition/localdayoff.js').initRelations();
    require('./definition/localemployee.js').initRelations();
    require('./definition/localspecialty.js').initRelations();
    require('./definition/patient.js').initRelations();
    require('./definition/patientlog.js').initRelations();
    require('./definition/quiz.js').initRelations();
    require('./definition/quizemployee.js').initRelations();
    require('./definition/quizissues.js').initRelations();
    require('./definition/quizspecialty.js').initRelations();
    require('./definition/reevaluation.js').initRelations();
    require('./definition/subspecialty.js').initRelations();
    require('./definition/treatment.js').initRelations();
    return model;
}

// Note: While using this module, DO NOT FORGET FIRST CALL model.init(sequelize). Otherwise you get undefined.
module.exports = model;
module.exports.init = init;
module.exports.isInitialized = initialized;
