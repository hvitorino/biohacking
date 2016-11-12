const passport = require('passport');
const crypto = require('crypto');
const Strategy = require('passport-local').Strategy;

module.exports = (app, models) => {

  passport.use(new Strategy(
    { passReqToCallback: true,  usernameField: 'email' },
    (req, email, password, done) => {
      models.User.findOne({
        where: {
          email,
        },
      }).then((user) => {
        if (!user) {
          return done(null, false, { message: 'userDontExist' });
        }
        // https://adambard.com/blog/3-wrong-ways-to-store-a-password/
        // https://gist.github.com/skeggse/52672ddee97c8efec269
        crypto.pbkdf2(password, user.get('salt'), 12000, 512, (err, hashRaw) => {
          if (err) {
            return done(null, false, { message: err.message });
          }
          const hash = new Buffer(hashRaw, 'binary').toString('hex');
          return (hash === user.get('hash')) ?
            done(null, user) :
            done(null, false, { message: 'incorrectPasswordError' });
        });
      }).catch((error) => done(null, false, { message: error.message }));
    }));

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    models.User.findById(id)
               .then(user => {
                 done(null, user);
               })
               .catch(({ message }) => done(null, false, { message }));
  });

  app.use(passport.initialize());
  app.use(passport.session());
  app.set('passport', passport);
};
