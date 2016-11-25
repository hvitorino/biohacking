

module.exports = {
  up(queryInterface, Sequelize) {
    // password: testes
    return queryInterface.bulkInsert('Users', [
            {
                "id": 1,
                "username": "cmilfont",
                "hash": "02ecd180dcd920a84894854384362b75784cf90da635e049cb2f2ca9712c2ac1670a0e9fd05b71a2c1be94e4840e3efabe77b4f0616730dc01a5f1dfccab4d991e0f06413632abd65fff09ba6e37dd2c9a2470ba44b393d83a231e8672207d8ac0637e30c220a058513e9406a71822c29d2c1539b7871f09835f4fa28687de80e74f9e3c6233d91488c62df2fba5af0465853715af3bf96329f8f92ad41a475b7916594bbf5f9f936172ecaeec52a53a664d300199c5acb6f1852b420270994213e5243568689f67de581bfd4f59a3862bfee028b1b8c1720da45047f828fb67131cc8236242c1cea38d3e4aba750f5bddfd45863b758580be9970198b5af13ccea3fa03d2d8e5764cb7953d7d5d028e7bef4045ebf9d9701843e759c9975a1fe81041c2b0b167377c2c70ab7447544af11a428e8134f79b59046c65d4783d691d71f3a57e373a5a0db4927fd3be5aedfe0456c754fb70f7019b5bff172b6f6f70bc8ad63b9e40df08021a1b90c2dbfe0a5b471c4522762cb7e44ff35985dbbc9fb94afe44367b6e0062ac526434b48453cadc4b96ad5944eeadd2bbac2202a1519d5835c8d743f6225fa9dc0bb0376cae6b4a8616b2db92afde2a3cdb7818b24b5150ed080e7564a179019436e8811be882ca52924b147ecccbde45da4584342a2b5483f38978860aa17aa0ad5e9f2772c523ab5bcb640416f6c19c62d73443",
                "salt": "d34a40c2a8e630f210500fade07728e35243600003fb1ee46a3cd9eb52f9bc1f",
                "email": "cmilfont@gmail.com",
                "activationKey": null,
                "resetPasswordKey": null,
                "verified": null,
                "createdAt": "2016-03-10T17:33:22.201Z",
                "updatedAt": "2016-03-10T17:33:22.201Z"
            }
    ]);
  },

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
