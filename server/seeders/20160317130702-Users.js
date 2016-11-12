'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Users', [
            {
                "id": 1,
                "username": "renan",
                "hash": "0155a140a3c3faec535709a2356a913474752daf9ccf541fe5c5a2c535ae84b6a5c95e70d7b0cc1371502d080c258c6156b6a6cd637eda82522410bfb304e42c932d59b8e1abbb449377d04ffb1f82aaa988e171ead6fbca975b937cecbe5e3cfecce4c6206df4c6cba27855f03e224fb3f019c29b350246d91f01e636f553fd1246b6e2ad20dbc833325190784c36725cd3523121107c29684955c63724ce883d9251e67ce3f7dee66a4d815009a515db98761c22043895baf66fe5f0018fe2dc7ef8c45998dd83f2a0d38415f77fb692724d0c8814dac2ec824893a8874dbc4ef2c4d7400aaebf99bfa97341c679a2ff364bfce3a6439f638ea2022059ed45125d0da77b635ddebac991dcea3d0427e7671f87aaff18486037bfce6e514aca95bf40e5a032b47f5074802ea053f55adeb24900178afee306082141593882d1fb1a7b339da6cd5901c33491413b2c9d4cb8b81b0f77036a8374c2a9e094d346e05df0b019ed1fef02f551f00d27f2cf9ff9990833041c4a83e30d69e5a31ee119a2488b796a321f03c6e1f807b0d578120e938b0a76f92e82542a235a61876d07c5a704ac04af25645bfec9bbe8d2d4d32c0adda211063c241db119c8c7a24d683ea5e47ee7b88c81b8956ca56dd3d0f9b09cbf3eeb667a921f6cc4bee230e55c17e3a74754f0a49a420527ffa655cab7eda5a15993b7176debc65cc5c52062",
                "salt": "d79d25392e16622ee3e2ffe617710b762895eec2be2a57de118eff3ad69e53bb",
                "email": "email@renanbandeira.com.br",
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
