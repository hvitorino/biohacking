'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {

        return queryInterface.bulkInsert('Kinds', [
          {
           "color" : "#FE5F55",
           "createdAt" : "2016-09-23T11:22:03-03:00",
           "description" : "WEIGHT",
           "id" : "1",
           "updatedAt" : "2016-09-23T11:22:03-03:00"
         }, {
           "color" : "#F0B67F",
           "createdAt" : "2016-09-23T11:22:03-03:00",
           "description" : "EAT",
           "id" : "2",
           "updatedAt" : "2016-09-23T11:22:03-03:00"
         }, {
           "color" : "#D6D1B1",
           "createdAt" : "2016-09-23T11:22:03-03:00",
           "description" : "DRINK",
           "id" : "3",
           "updatedAt" : "2016-09-23T11:22:03-03:00"
         }, {
           "color" : "#C7EFCF",
           "createdAt" : "2016-09-23T11:22:03-03:00",
           "description" : "WORKOUT",
           "id" : "4",
           "updatedAt" : "2016-09-23T11:22:03-03:00"
         }, {
           "color" : "#EEF5DB",
           "createdAt" : "2016-09-23T11:22:03-03:00",
           "description" : "HUNGRY",
           "id" : "5",
           "updatedAt" : "2016-09-23T11:22:03-03:00"
         }, {
           "color" : "#D496A7",
           "createdAt" : "2016-09-23T11:22:03-03:00",
           "description" : "SLEEP",
           "id" : "6",
           "updatedAt" : "2016-09-23T11:22:03-03:00"
         }, {
           "color" : "#F1DEDE",
           "createdAt" : "2016-09-23T11:22:03-03:00",
           "description" : "WAKEUP",
           "id" : "7",
           "updatedAt" : "2016-09-23T11:22:03-03:00"
         }, {
           "color" : "#5D576B",
           "createdAt" : "2016-09-23T11:22:03-03:00",
           "description" : "SEX",
           "id" : "8",
           "updatedAt" : "2016-09-23T11:22:03-03:00"
         }, {
           "color" : "#FE938C",
           "createdAt" : "2016-09-23T11:22:03-03:00",
           "description" : "BATH",
           "id" : "9",
           "updatedAt" : "2016-09-23T11:22:03-03:00"
         }, {
           "color" : "#6CD4FF",
           "createdAt" : "2016-09-23T11:22:03-03:00",
           "description" : "PARTY",
           "id" : "10",
           "updatedAt" : "2016-09-23T11:22:03-03:00"
         }, {
           "color" : "#261C15",
           "createdAt" : "2016-09-23T11:22:03-03:00",
           "description" : "READ",
           "id" : "11",
           "updatedAt" : "2016-09-23T11:22:03-03:00"
         }, {
           "color" : "#F05D23",
           "createdAt" : "2016-09-23T11:22:03-03:00",
           "description" : "WRITE",
           "id" : "12",
           "updatedAt" : "2016-09-23T11:22:03-03:00"
         }, {
           "color" : "#D6D1B1",
           "createdAt" : "2016-09-23T11:22:03-03:00",
           "description" : "PRAY",
           "id" : "13",
           "updatedAt" : "2016-09-23T11:22:03-03:00"
         }, {
           "color" : "#C5D86D",
           "createdAt" : "2016-09-23T11:22:03-03:00",
           "description" : "MEDITATE",
           "id" : "14",
           "updatedAt" : "2016-09-23T11:22:03-03:00"
         }, {
           "color" : "#55828B",
           "createdAt" : "2016-09-23T11:22:03-03:00",
           "description" : "WORK",
           "id" : "15",
           "updatedAt" : "2016-09-23T11:22:03-03:00"
         }, {
           "color" : "#87BBA2",
           "createdAt" : "2016-09-23T11:22:03-03:00",
           "description" : "TRAVEL",
           "id" : "16",
           "updatedAt" : "2016-09-23T11:22:03-03:00"
         }, {
           "color" : "#F28F3B",
           "createdAt" : "2016-09-23T11:22:03-03:00",
           "description" : "LISTEN",
           "id" : "17",
           "updatedAt" : "2016-09-23T11:22:03-03:00"
         }, {
           "color" : "#364958",
           "createdAt" : "2016-09-23T11:22:03-03:00",
           "description" : "STUDY",
           "id" : "18",
           "updatedAt" : "2016-09-23T11:22:03-03:00"
         } 

        ], {});

    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Kind', null, {});
    }
};
