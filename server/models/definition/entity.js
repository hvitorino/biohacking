'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Entity', {
        entity: {
            type: DataTypes.BIGINT,
            field: 'entity',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        entityid: {
            type: DataTypes.INTEGER,
            field: 'entityid',
            allowNull: false
        },
        institution: {
            type: DataTypes.BIGINT,
            field: 'institution',
            allowNull: true,
            references: {
                model: 'institution',
                key: 'institution'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
        },
        Block: {
            type: DataTypes.CHAR(1),
            field: '_block',
            allowNull: true
        }
    }, {
        schema: 'public',
        tableName: 'entity',
        timestamps: false
    });
};

module.exports.initRelations = function() {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
    var model = require('../index');
    var Entity = model.Entity;
    var Anamnesis = model.Anamnesis;
    var Answerissue = model.Answerissue;
    var Employeeoccupation = model.Employeeoccupation;
    var Entityemployee = model.Entityemployee;
    var Interview = model.Interview;
    var Localdayoff = model.Localdayoff;
    var Patient = model.Patient;
    var Patientlog = model.Patientlog;
    var Quiz = model.Quiz;
    var Quizemployee = model.Quizemployee;
    var Quizissue = model.Quizissue;
    var Quizspecialty = model.Quizspecialty;
    var Reevaluation = model.Reevaluation;
    var Subspecialty = model.Subspecialty;
    var Treatment = model.Treatment;
    var Appointment = model.Appointment;
    var Followup = model.Followup;
    var Office = model.Office;
    var Schedule = model.Schedule;
    var Schedulespecialty = model.Schedulespecialty;
    var Scheduletemplate = model.Scheduletemplate;
    var Appuser = model.Appuser;
    var Institution = model.Institution;
    var Employee = model.Employee;
    var Occupation = model.Occupation;
    var Dayoff = model.Dayoff;
    var Person = model.Person;
    var Issueslist = model.Issueslist;
    var Specialty = model.Specialty;

    Entity.hasMany(Anamnesis, {
        as: 'FkanamnesisEnts',
        foreignKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Entity.hasMany(Answerissue, {
        as: 'FkanswerissuesEnts',
        foreignKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Entity.hasMany(Employeeoccupation, {
        as: 'FkemployeeoccupationEnts',
        foreignKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Entity.hasMany(Entityemployee, {
        as: 'FkentityemployeeEnts',
        foreignKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Entity.hasMany(Interview, {
        as: 'FkinterviewEnts',
        foreignKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Entity.hasMany(Localdayoff, {
        as: 'FklocaldayoffEnts',
        foreignKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Entity.hasMany(Patient, {
        as: 'FkpatientEnts',
        foreignKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Entity.hasMany(Patientlog, {
        as: 'FkpatientlogEnts',
        foreignKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Entity.hasMany(Quiz, {
        as: 'FkquizEnts',
        foreignKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Entity.hasMany(Quizemployee, {
        as: 'FkquizemployeeEnts',
        foreignKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Entity.hasMany(Quizissue, {
        as: 'FkquizissuesEnts',
        foreignKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Entity.hasMany(Quizspecialty, {
        as: 'FkquizspecialtyEnts',
        foreignKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Entity.hasMany(Reevaluation, {
        as: 'FkreevaluationEnts',
        foreignKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Entity.hasMany(Subspecialty, {
        as: 'FksubspecialtyEnts',
        foreignKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Entity.hasMany(Treatment, {
        as: 'FktreatmentEnts',
        foreignKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Entity.hasMany(Appointment, {
        as: 'FkappointmentEnts',
        foreignKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Entity.hasMany(Followup, {
        as: 'FkfollowupEnts',
        foreignKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Entity.hasMany(Office, {
        as: 'FkofficeEnts',
        foreignKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Entity.hasMany(Schedule, {
        as: 'FkscheduleEnts',
        foreignKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Entity.hasMany(Schedulespecialty, {
        as: 'FkschedulespecialtyEnts',
        foreignKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Entity.hasMany(Scheduletemplate, {
        as: 'FkscheduletemplateEnts',
        foreignKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Entity.hasMany(Appuser, {
        as: 'FkappuserEnts',
        foreignKey: 'entity',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Entity.belongsTo(Institution, {
        as: 'RelatedInstitution',
        foreignKey: 'institution',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Entity.belongsToMany(Interview, {
        as: 'AnamnesisInterviews',
        through: Anamnesis,
        foreignKey: 'entity',
        otherKey: 'interview',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Entity.belongsToMany(Patient, {
        as: 'AnamnesisPatients',
        through: Anamnesis,
        foreignKey: 'entity',
        otherKey: 'patient',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Entity.belongsToMany(Quiz, {
        as: 'AnamnesisQuizzes',
        through: Anamnesis,
        foreignKey: 'entity',
        otherKey: 'quiz',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Entity.belongsToMany(Interview, {
        as: 'AnswerissueInterviews',
        through: Answerissue,
        foreignKey: 'entity',
        otherKey: 'interview',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Entity.belongsToMany(Quizissue, {
        as: 'AnswerissueQuizissues',
        through: Answerissue,
        foreignKey: 'entity',
        otherKey: 'quizissues',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Entity.belongsToMany(Employee, {
        as: 'EmployeeoccupationEmployees',
        through: Employeeoccupation,
        foreignKey: 'entity',
        otherKey: 'employee',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Entity.belongsToMany(Occupation, {
        as: 'EmployeeoccupationOccupations',
        through: Employeeoccupation,
        foreignKey: 'entity',
        otherKey: 'occupation',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Entity.belongsToMany(Employee, {
        as: 'EntityemployeeEmployees',
        through: Entityemployee,
        foreignKey: 'entity',
        otherKey: 'employee',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Entity.belongsToMany(Employee, {
        as: 'InterviewEmployees',
        through: Interview,
        foreignKey: 'entity',
        otherKey: 'employee',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Entity.belongsToMany(Patient, {
        as: 'InterviewPatients',
        through: Interview,
        foreignKey: 'entity',
        otherKey: 'patient',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Entity.belongsToMany(Dayoff, {
        as: 'LocaldayoffDayoffs',
        through: Localdayoff,
        foreignKey: 'entity',
        otherKey: 'dayoff',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Entity.belongsToMany(Person, {
        as: 'PatientPeople',
        through: Patient,
        foreignKey: 'entity',
        otherKey: 'person',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Entity.belongsToMany(Patient, {
        as: 'PatientlogPatients',
        through: Patientlog,
        foreignKey: 'entity',
        otherKey: 'patient',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Entity.belongsToMany(Employee, {
        as: 'QuizemployeeEmployees',
        through: Quizemployee,
        foreignKey: 'entity',
        otherKey: 'employee',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Entity.belongsToMany(Quiz, {
        as: 'QuizemployeeQuizzes',
        through: Quizemployee,
        foreignKey: 'entity',
        otherKey: 'quiz',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Entity.belongsToMany(Issueslist, {
        as: 'QuizissueIssueslists',
        through: Quizissue,
        foreignKey: 'entity',
        otherKey: 'issueslist',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Entity.belongsToMany(Quiz, {
        as: 'QuizissueQuizzes',
        through: Quizissue,
        foreignKey: 'entity',
        otherKey: 'quiz',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Entity.belongsToMany(Quiz, {
        as: 'QuizspecialtyQuizzes',
        through: Quizspecialty,
        foreignKey: 'entity',
        otherKey: 'quiz',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Entity.belongsToMany(Specialty, {
        as: 'QuizspecialtySpecialties',
        through: Quizspecialty,
        foreignKey: 'entity',
        otherKey: 'specialty',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Entity.belongsToMany(Subspecialty, {
        as: 'QuizspecialtySubspecialties',
        through: Quizspecialty,
        foreignKey: 'entity',
        otherKey: 'subspecialty',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Entity.belongsToMany(Interview, {
        as: 'ReevaluationInterviews',
        through: Reevaluation,
        foreignKey: 'entity',
        otherKey: 'interview',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Entity.belongsToMany(Patient, {
        as: 'ReevaluationPatients',
        through: Reevaluation,
        foreignKey: 'entity',
        otherKey: 'patient',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Entity.belongsToMany(Specialty, {
        as: 'SubspecialtySpecialties',
        through: Subspecialty,
        foreignKey: 'entity',
        otherKey: 'specialty',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Entity.belongsToMany(Interview, {
        as: 'TreatmentInterviews',
        through: Treatment,
        foreignKey: 'entity',
        otherKey: 'interview',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Entity.belongsToMany(Patient, {
        as: 'TreatmentPatients',
        through: Treatment,
        foreignKey: 'entity',
        otherKey: 'patient',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Entity.belongsToMany(Employee, {
        as: 'AppointmentEmployees',
        through: Appointment,
        foreignKey: 'entity',
        otherKey: 'employee',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Entity.belongsToMany(Employee, {
        as: 'AppointmentExecutants',
        through: Appointment,
        foreignKey: 'entity',
        otherKey: 'executant',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Entity.belongsToMany(Appointment, {
        as: 'AppointmentLastappointments',
        through: Appointment,
        foreignKey: 'entity',
        otherKey: 'lastappointment',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Entity.belongsToMany(Office, {
        as: 'AppointmentOffices',
        through: Appointment,
        foreignKey: 'entity',
        otherKey: 'office',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Entity.belongsToMany(Patient, {
        as: 'AppointmentPatients',
        through: Appointment,
        foreignKey: 'entity',
        otherKey: 'patient',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Entity.belongsToMany(Employee, {
        as: 'AppointmentRequesters',
        through: Appointment,
        foreignKey: 'entity',
        otherKey: 'requester',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Entity.belongsToMany(Schedule, {
        as: 'AppointmentSchedules',
        through: Appointment,
        foreignKey: 'entity',
        otherKey: 'schedule',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Entity.belongsToMany(Specialty, {
        as: 'AppointmentSpecialties',
        through: Appointment,
        foreignKey: 'entity',
        otherKey: 'specialty',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Entity.belongsToMany(Subspecialty, {
        as: 'AppointmentSubspecialties',
        through: Appointment,
        foreignKey: 'entity',
        otherKey: 'subspecialty',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Entity.belongsToMany(Interview, {
        as: 'FollowupInterviews',
        through: Followup,
        foreignKey: 'entity',
        otherKey: 'interview',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Entity.belongsToMany(Patient, {
        as: 'FollowupPatients',
        through: Followup,
        foreignKey: 'entity',
        otherKey: 'patient',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Entity.belongsToMany(Quiz, {
        as: 'FollowupQuizzes',
        through: Followup,
        foreignKey: 'entity',
        otherKey: 'quiz',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Entity.belongsToMany(Employee, {
        as: 'ScheduleEmployees',
        through: Schedule,
        foreignKey: 'entity',
        otherKey: 'employee',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Entity.belongsToMany(Office, {
        as: 'ScheduleOffices',
        through: Schedule,
        foreignKey: 'entity',
        otherKey: 'office',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Entity.belongsToMany(Scheduletemplate, {
        as: 'ScheduleScheduletemplates',
        through: Schedule,
        foreignKey: 'entity',
        otherKey: 'scheduletemplate',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Entity.belongsToMany(Specialty, {
        as: 'ScheduleSpecialties',
        through: Schedule,
        foreignKey: 'entity',
        otherKey: 'specialty',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Entity.belongsToMany(Subspecialty, {
        as: 'ScheduleSubspecialties',
        through: Schedule,
        foreignKey: 'entity',
        otherKey: 'subspecialty',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Entity.belongsToMany(Scheduletemplate, {
        as: 'SchedulespecialtyScheduletemplates',
        through: Schedulespecialty,
        foreignKey: 'entity',
        otherKey: 'scheduletemplate',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Entity.belongsToMany(Specialty, {
        as: 'SchedulespecialtySpecialties',
        through: Schedulespecialty,
        foreignKey: 'entity',
        otherKey: 'specialty',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Entity.belongsToMany(Subspecialty, {
        as: 'SchedulespecialtySubspecialties',
        through: Schedulespecialty,
        foreignKey: 'entity',
        otherKey: 'subspecialty',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Entity.belongsToMany(Employee, {
        as: 'ScheduletemplateEmployees',
        through: Scheduletemplate,
        foreignKey: 'entity',
        otherKey: 'employee',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Entity.belongsToMany(Office, {
        as: 'ScheduletemplateOffices',
        through: Scheduletemplate,
        foreignKey: 'entity',
        otherKey: 'office',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Entity.belongsToMany(Employee, {
        as: 'AppuserEmployees',
        through: Appuser,
        foreignKey: 'entity',
        otherKey: 'employee',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
