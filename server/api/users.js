class Users {

  redirectErrors(res) {
    return (error) => res.status(412).send({ messages: error.errors });
  }

  create(req, res, next) {
    const User = this.models.User;

    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (!user) {
        const newUser = User.build({ email: req.body.email });

        newUser.validate().then(error => {
          if (error) {
            this.redirectErrors(res)(error);
          } else {
            newUser.setPassword(req.body.password, () => {
              newUser.save()
                     .then(() => {
                       req.login(newUser, err => {
                         if (err) { return next(err); }
                         return res.send(newUser);
                       });
                     })
                     .catch(this.redirectErrors(res));
            });
          }
        });
      } else {
        this.redirectErrors(res)({
          errors: [
            {
              message: 'email_already_registerd',
              type: 'Validation error',
              path: 'email',
            }
          ]
        });
      }
    }).catch(this.redirectErrors(res));
  }

  constructor(app, models) {
    const passport = app.get('passport');
    this.app = app;
    this.models = models;
    app.post('/api/register', this.create.bind(this));
    app.post('/api/login', passport.authenticate('local'), (req, res) => res.send(req.user));
  }
}

module.exports = Users;
