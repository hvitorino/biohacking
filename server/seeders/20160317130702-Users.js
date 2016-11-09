'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Users', [
            {
                "id": 1,
                "username": "cmilfont",
                "hash": "03d4cfb9441617221a1debefc578675526d8de46cadb7e7b7473ef4171eba0bafdcb91f3d47079c7fca7c853b75d610de72f43a70df0283ac7b2c99e3179745c1ce4561a6df02687e3418a1ea00d038cb2891194e0b9d5dde8032180a212932ee6eff6c29a1ac6a011d86a19bc78a3dcf1fb1d841249cdb7d20608496d3dd535819920e8de92464d7958553d390d7a48f11fb0f42f2da42bf38e6d8dbd13312074d23f84ed059ce750c0a89e7aaaa01444056278d0e0f845df418a6f9bf5cb2862a19b7f02006a3a9e67dda470098aacfec68c8c1cc28316cbcfb3af3bd30d205db1a86898d8e3649287f095982629d0d015fad9151c942924533fe8aadb3923b7c91f6427ecd7d6c19a09509dd3fe24d9694e10a416b19fffc27393a987724e55d89b25a122eeabb8807d356a71981f97ac007a7bc34be54cca6b48f1562204f31aacdae76df22c41ca29c18b47e9d49cbc5d0b3795d384b7794278eea16aa2a76e90f5966db4ac3d7ee9f48a94acd975d5b7a3c9d5b7c3464d853a01f3d0668b6d9d1cfe6422b9d46d4115110b62ad2e18362c8dbed383940e8e70817283e798cb3be234139f77290937f32c337f29466444d635d3e2300d6edfca76b6da4ba22488874cbd1352a03b12016be886c1a8c9e23c0f95de7c2b5e697af4ce31026390e639a54de94ae28aeec79b2eee6e3043af1822ef04c32f0dc1f0ba7d7483",
                "salt": "d79d25392e16622ee3e2ffe617710b762895eec2be2a57de118eff3ad69e53bb",
                "email": "cmilfont@gmail.com",
                "activationKey": null,
                "resetPasswordKey": null,
                "verified": null,
                "createdAt": "2016-03-10T17:33:22.201Z",
                "updatedAt": "2016-03-10T17:33:22.201Z"
            }
        ]);
    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Users', null, {});
    }
};
