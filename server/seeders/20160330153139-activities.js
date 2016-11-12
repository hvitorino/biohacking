'use strict';

var moment = require("moment");

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Activities', [
            // {
            //     "id": 1,
            //     "UserId": 1,
            //     "KindId": 1,
            //     "description": "#86kg",
            //     "secret": true,
            //     "createdAt": new Date,
            //     "updatedAt": new Date
            // },
            // {
            //     "id": 2,
            //     "UserId": 1,
            //     "KindId": 2,
            //     "description": "#bacon #pork #lowcard #lchf",
            //     "secret": true,
            //     "createdAt": new Date,
            //     "updatedAt": new Date
            // },
            // {
            //     "id": 3,
            //     "UserId": 1,
            //     "KindId": 4,
            //     "description": "",
            //     "secret": true,
            //     "createdAt": moment().add(1, 'days').format(),
            //     "updatedAt": moment().add(1, 'days').format()
            // }
        ]);
    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Activities', null, {});
    }
};
