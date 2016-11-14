const crypto = require('crypto');
const uuid = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING
    },
    name: DataTypes.STRING,
    hash: DataTypes.STRING,
    salt: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    googleId: {
      type: DataTypes.STRING
    },
    imageUrl: DataTypes.STRING,
    activationKey: DataTypes.STRING,
    resetPasswordKey: DataTypes.STRING,
    verified: DataTypes.BOOLEAN
  }, {
    instanceMethods: {
      generateResetPasswordKey: function(callback) {
        const resetPasswordKey = uuid();
        this.set('resetPasswordKey', resetPasswordKey);
        this.update({ resetPasswordKey });
        callback(this);
      },
      generateHash: function(callback) {
        const updateHash = this.update.bind(this);
        crypto.randomBytes(32, (error, buffer) => {
          const hash = buffer.toString('hex');
          updateHash({ hash }).then(callback);
        });
      },
      setPassword: function (password, callback) {
        const self = this;
        crypto.randomBytes(32, function (error, buf) {
          const salt = buf.toString('hex');
          crypto.pbkdf2(password, salt, 12000, 512, function (err, hashRaw) {
            self.set('hash', new Buffer(hashRaw, 'binary').toString('hex'));
            self.set('salt', salt);
            callback(null, self);
          });
        });
      },
    },
  });
  return User;
};
