const moment = require('moment');

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Activities', [
            {
                "id": 1,
                "UserId": 1,
                "KindId": 1,
                "description": "#86kg",
                "secret": true,
                "loggedAt": moment().subtract(1, 'days').format(),
                "createdAt": new Date,
                "updatedAt": new Date
            },
            {
                "id": 2,
                "UserId": 1,
                "KindId": 2,
                "description": "#bacon #pork #lowcard #lchf",
                "secret": true,
                "loggedAt": moment().add(3, 'hours').format(),
                "createdAt": new Date,
                "updatedAt": new Date
            },
            {
                "id": 3,
                "UserId": 1,
                "KindId": 4,
                "description": "",
                "secret": true,
                "loggedAt": moment().add(5, 'hours').format(),
                "createdAt": moment().add(1, 'days').format(),
                "updatedAt": moment().add(1, 'days').format()
            }
    ]);
  },

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Activities', null, {});
  },
};
