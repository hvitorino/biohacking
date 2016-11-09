'use strict';

var model = {};
var initialized = false;

function init(sequelize) {
    delete module.exports.init; // Destroy itself to prevent repeated calls and clash with a model named 'init'.
    initialized = true;
    // Import model files and assign them to `model` object.
    model.Dayoff = sequelize.import('./definition/dayoff.js');
    model.Employee = sequelize.import('./definition/employee.js');
    model.Icd = sequelize.import('./definition/icd.js');
    model.Icdcategory = sequelize.import('./definition/icdcategory.js');
    model.Institution = sequelize.import('./definition/institution.js');
    model.Issueslist = sequelize.import('./definition/issueslist.js');
    model.Legalentity = sequelize.import('./definition/legalentity.js');
    model.Maritalstatus = sequelize.import('./definition/maritalstatus.js');
    model.Occupation = sequelize.import('./definition/occupation.js');
    model.Occupationgroup = sequelize.import('./definition/occupationgroup.js');
    model.Person = sequelize.import('./definition/person.js');
    model.Product = sequelize.import('./definition/product.js');
    model.Productgroup = sequelize.import('./definition/productgroup.js');
    model.Productunit = sequelize.import('./definition/productunit.js');
    model.Sex = sequelize.import('./definition/sex.js');
    model.Specialty = sequelize.import('./definition/specialty.js');
    model.Unitdose = sequelize.import('./definition/unitdose.js');

    // All models are initialized. Now connect them with relations.
    require('./definition/dayoff.js').initRelations();
    require('./definition/employee.js').initRelations();
    require('./definition/icd.js').initRelations();
    require('./definition/icdcategory.js').initRelations();
    require('./definition/institution.js').initRelations();
    require('./definition/issueslist.js').initRelations();
    require('./definition/legalentity.js').initRelations();
    require('./definition/maritalstatus.js').initRelations();
    require('./definition/occupation.js').initRelations();
    require('./definition/occupationgroup.js').initRelations();
    require('./definition/person.js').initRelations();
    require('./definition/product.js').initRelations();
    require('./definition/productgroup.js').initRelations();
    require('./definition/productunit.js').initRelations();
    require('./definition/sex.js').initRelations();
    require('./definition/specialty.js').initRelations();
    require('./definition/unitdose.js').initRelations();
    return model;
}

// Note: While using this module, DO NOT FORGET FIRST CALL model.init(sequelize). Otherwise you get undefined.
module.exports = model;
module.exports.init = init;
module.exports.isInitialized = initialized;
