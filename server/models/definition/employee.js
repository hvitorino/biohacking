'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Employee', {
        employee: {
            type: DataTypes.BIGINT,
            field: 'employee',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        person: {
            type: DataTypes.BIGINT,
            field: 'person',
            allowNull: false,
            references: {
                model: 'person',
                key: 'person'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
        },
        occupation: {
            type: DataTypes.BIGINT,
            field: 'occupation',
            allowNull: false,
            references: {
                model: 'occupation',
                key: 'occupation'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
        },
        professionalid: {
            type: DataTypes.STRING(30),
            field: 'professionalid',
            allowNull: true
        },
        Block: {
            type: DataTypes.CHAR(1),
            field: '_block',
            allowNull: true
        }
    }, {
        schema: 'shared',
        tableName: 'employee',
        timestamps: false
    });
};

module.exports.initRelations = function() {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
    var model = require('../index');
    var Employee = model.Employee;
    var Employeeoccupation = model.Employeeoccupation;
    var Entityemployee = model.Entityemployee;
    var Interview = model.Interview;
    var Quizemployee = model.Quizemployee;
    var Appointment = model.Appointment;
    var Schedule = model.Schedule;
    var Scheduletemplate = model.Scheduletemplate;
    var Appuser = model.Appuser;
    var Occupation = model.Occupation;
    var Person = model.Person;
    var Entity = model.Entity;
    var Patient = model.Patient;
    var Quiz = model.Quiz;
    var Office = model.Office;
    var Specialty = model.Specialty;
    var Subspecialty = model.Subspecialty;

    Employee.hasMany(Employeeoccupation, {
        as: 'FkemployeeoccupationEmps',
        foreignKey: 'employee',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Employee.hasMany(Entityemployee, {
        as: 'FkentityemployeeEmps',
        foreignKey: 'employee',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Employee.hasMany(Interview, {
        as: 'FkinterviewEmps',
        foreignKey: 'employee',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Employee.hasMany(Quizemployee, {
        as: 'FkquizemployeeEmps',
        foreignKey: 'employee',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Employee.hasMany(Appointment, {
        as: 'FkappointmentEmps',
        foreignKey: 'employee',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Employee.hasMany(Appointment, {
        as: 'FkappointmentExes',
        foreignKey: 'executant',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Employee.hasMany(Appointment, {
        as: 'FkappointmentReqs',
        foreignKey: 'requester',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Employee.hasMany(Schedule, {
        as: 'FkscheduleEmps',
        foreignKey: 'employee',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Employee.hasMany(Scheduletemplate, {
        as: 'FkscheduletemplateEmps',
        foreignKey: 'employee',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Employee.hasMany(Appuser, {
        as: 'FkappuserEmps',
        foreignKey: 'employee',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Employee.belongsTo(Occupation, {
        as: 'RelatedOccupation',
        foreignKey: 'occupation',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Employee.belongsTo(Person, {
        as: 'RelatedPerson',
        foreignKey: 'person',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Employee.belongsToMany(Entity, {
        as: 'EmployeeoccupationEntities',
        through: Employeeoccupation,
        foreignKey: 'employee',
        otherKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Employee.belongsToMany(Occupation, {
        as: 'EmployeeoccupationOccupations',
        through: Employeeoccupation,
        foreignKey: 'employee',
        otherKey: 'occupation',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Employee.belongsToMany(Entity, {
        as: 'EntityemployeeEntities',
        through: Entityemployee,
        foreignKey: 'employee',
        otherKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Employee.belongsToMany(Entity, {
        as: 'InterviewEntities',
        through: Interview,
        foreignKey: 'employee',
        otherKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Employee.belongsToMany(Patient, {
        as: 'InterviewPatients',
        through: Interview,
        foreignKey: 'employee',
        otherKey: 'patient',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Employee.belongsToMany(Entity, {
        as: 'QuizemployeeEntities',
        through: Quizemployee,
        foreignKey: 'employee',
        otherKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Employee.belongsToMany(Quiz, {
        as: 'QuizemployeeQuizzes',
        through: Quizemployee,
        foreignKey: 'employee',
        otherKey: 'quiz',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Employee.belongsToMany(Entity, {
        as: 'AppointmentEntities',
        through: Appointment,
        foreignKey: 'employee',
        otherKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Employee.belongsToMany(Employee, {
        as: 'AppointmentExecutants',
        through: Appointment,
        foreignKey: 'employee',
        otherKey: 'executant',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Employee.belongsToMany(Appointment, {
        as: 'AppointmentLastappointments',
        through: Appointment,
        foreignKey: 'employee',
        otherKey: 'lastappointment',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Employee.belongsToMany(Office, {
        as: 'AppointmentOffices',
        through: Appointment,
        foreignKey: 'employee',
        otherKey: 'office',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Employee.belongsToMany(Patient, {
        as: 'AppointmentPatients',
        through: Appointment,
        foreignKey: 'employee',
        otherKey: 'patient',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Employee.belongsToMany(Employee, {
        as: 'AppointmentRequesters',
        through: Appointment,
        foreignKey: 'employee',
        otherKey: 'requester',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Employee.belongsToMany(Schedule, {
        as: 'AppointmentSchedules',
        through: Appointment,
        foreignKey: 'employee',
        otherKey: 'schedule',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Employee.belongsToMany(Specialty, {
        as: 'AppointmentSpecialties',
        through: Appointment,
        foreignKey: 'employee',
        otherKey: 'specialty',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Employee.belongsToMany(Subspecialty, {
        as: 'AppointmentSubspecialties',
        through: Appointment,
        foreignKey: 'employee',
        otherKey: 'subspecialty',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Employee.belongsToMany(Employee, {
        as: 'AppointmentEmployees',
        through: Appointment,
        foreignKey: 'executant',
        otherKey: 'employee',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Employee.belongsToMany(Entity, {
        as: 'AppointmentEntities',
        through: Appointment,
        foreignKey: 'executant',
        otherKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Employee.belongsToMany(Appointment, {
        as: 'AppointmentLastappointments',
        through: Appointment,
        foreignKey: 'executant',
        otherKey: 'lastappointment',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Employee.belongsToMany(Office, {
        as: 'AppointmentOffices',
        through: Appointment,
        foreignKey: 'executant',
        otherKey: 'office',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Employee.belongsToMany(Patient, {
        as: 'AppointmentPatients',
        through: Appointment,
        foreignKey: 'executant',
        otherKey: 'patient',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Employee.belongsToMany(Employee, {
        as: 'AppointmentRequesters',
        through: Appointment,
        foreignKey: 'executant',
        otherKey: 'requester',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Employee.belongsToMany(Schedule, {
        as: 'AppointmentSchedules',
        through: Appointment,
        foreignKey: 'executant',
        otherKey: 'schedule',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Employee.belongsToMany(Specialty, {
        as: 'AppointmentSpecialties',
        through: Appointment,
        foreignKey: 'executant',
        otherKey: 'specialty',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Employee.belongsToMany(Subspecialty, {
        as: 'AppointmentSubspecialties',
        through: Appointment,
        foreignKey: 'executant',
        otherKey: 'subspecialty',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Employee.belongsToMany(Employee, {
        as: 'AppointmentEmployees',
        through: Appointment,
        foreignKey: 'requester',
        otherKey: 'employee',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Employee.belongsToMany(Entity, {
        as: 'AppointmentEntities',
        through: Appointment,
        foreignKey: 'requester',
        otherKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Employee.belongsToMany(Employee, {
        as: 'AppointmentExecutants',
        through: Appointment,
        foreignKey: 'requester',
        otherKey: 'executant',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Employee.belongsToMany(Appointment, {
        as: 'AppointmentLastappointments',
        through: Appointment,
        foreignKey: 'requester',
        otherKey: 'lastappointment',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Employee.belongsToMany(Office, {
        as: 'AppointmentOffices',
        through: Appointment,
        foreignKey: 'requester',
        otherKey: 'office',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Employee.belongsToMany(Patient, {
        as: 'AppointmentPatients',
        through: Appointment,
        foreignKey: 'requester',
        otherKey: 'patient',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Employee.belongsToMany(Schedule, {
        as: 'AppointmentSchedules',
        through: Appointment,
        foreignKey: 'requester',
        otherKey: 'schedule',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Employee.belongsToMany(Specialty, {
        as: 'AppointmentSpecialties',
        through: Appointment,
        foreignKey: 'requester',
        otherKey: 'specialty',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Employee.belongsToMany(Subspecialty, {
        as: 'AppointmentSubspecialties',
        through: Appointment,
        foreignKey: 'requester',
        otherKey: 'subspecialty',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Employee.belongsToMany(Entity, {
        as: 'ScheduleEntities',
        through: Schedule,
        foreignKey: 'employee',
        otherKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Employee.belongsToMany(Office, {
        as: 'ScheduleOffices',
        through: Schedule,
        foreignKey: 'employee',
        otherKey: 'office',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Employee.belongsToMany(Scheduletemplate, {
        as: 'ScheduleScheduletemplates',
        through: Schedule,
        foreignKey: 'employee',
        otherKey: 'scheduletemplate',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Employee.belongsToMany(Specialty, {
        as: 'ScheduleSpecialties',
        through: Schedule,
        foreignKey: 'employee',
        otherKey: 'specialty',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Employee.belongsToMany(Subspecialty, {
        as: 'ScheduleSubspecialties',
        through: Schedule,
        foreignKey: 'employee',
        otherKey: 'subspecialty',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Employee.belongsToMany(Entity, {
        as: 'ScheduletemplateEntities',
        through: Scheduletemplate,
        foreignKey: 'employee',
        otherKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Employee.belongsToMany(Office, {
        as: 'ScheduletemplateOffices',
        through: Scheduletemplate,
        foreignKey: 'employee',
        otherKey: 'office',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Employee.belongsToMany(Entity, {
        as: 'AppuserEntities',
        through: Appuser,
        foreignKey: 'employee',
        otherKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
