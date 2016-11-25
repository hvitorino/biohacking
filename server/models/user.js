const crypto = require('crypto');
const uuid = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
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
      type: DataTypes.STRING,
    },
    imageUrl: DataTypes.STRING,
    activationKey: DataTypes.STRING,
    resetPasswordKey: DataTypes.STRING,
    verified: DataTypes.BOOLEAN,
  }, {
    instanceMethods: {
      generateResetPasswordKey(callback) {
        const resetPasswordKey = uuid();
        this.set('resetPasswordKey', resetPasswordKey);
        this.update({ resetPasswordKey });
        callback(this);
      },
      generateHash(callback) {
        const updateHash = this.update.bind(this);
        crypto.randomBytes(32, (error, buffer) => {
          const hash = buffer.toString('hex');
          updateHash({ hash }).then(callback);
        });
      },
      setPassword(password) {
        const self = this;
        return new Promise((resolve, reject) => {
          if (password && typeof password === 'string') {
            crypto.randomBytes(32, (error, buf) => {
              if (error) {
                reject(error);
              }
              const salt = buf.toString('hex');
              crypto.pbkdf2(password, salt, 12000, 512, 'sha512', (err, hashRaw) => {
                this.set('hash', new Buffer(hashRaw, 'binary').toString('hex'));
                this.set('salt', salt);
                resolve(this);
              });
            });
          } else {
            const error = {
              errors: [{
                message: 'invalid_password',
                type: 'Validation error',
                path: 'password',
              }],
            };
            reject(error);
          }
        });
      },
    },
  });
  return User;
};
