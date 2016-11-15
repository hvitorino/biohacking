const Mailer = require('./services/mailer');

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
              message: 'email_already_registered',
              type: 'Validation error',
              path: 'email',
            }
          ]
        });
      }
    }).catch(this.redirectErrors(res));
  }

  reset(req, res) {
    const User = this.models.User;
    User.findOne({
      where: {
        email: req.body.email,
      },
    }).then(user => {
      if (!user) {
        const error = {
          errors: [{
            message: 'email_not_found',
            type: 'Validation error',
            path: 'email',
          }],
        };
        this.redirectErrors(res, 'reset')(error);
      } else {
        user.generateResetPasswordKey(user => {
          const mailer = new Mailer();
          const url = `https://zonaextrema.com.br/token/${user.resetPasswordKey}`;
          const template = `<a href="${url}">Clique pra trocar a senha</a>`;
          mailer.send({
            from: 'zonaextrema@produtoreativo.com.br',
            to: user.email,
            subject: 'Biohacking from Produto Reativo: Reset Password',
            content: `Alguém com o email ${user.email} solicitou troca de senha, ${template}`,
          }).then((response) => {
            console.log(response.statusCode);
            console.log(response.body);
            console.log(response.headers);
            res.send({
              message: 'email_sent'
            })
          }).catch((error) => {
            console.log('Error', error);
            this.redirectErrors(res)({
              errors: [
                {
                  message: error.message,
                  type: 'Validation error',
                  path: 'mailer',
                }
              ]
            });
          });
        });
      }
    }).catch(this.redirectErrors(res));

  }

  change(req, res) {
    const User = this.models.User;
    User.findOne({
      where: {
        token: req.body.token,
      },
    }).then(user => {
      if (!user) {
        const error = {
          errors: [{
            message: 'email_not_found',
            type: 'Validation error',
            path: 'email',
          }],
        };
        this.redirectErrors(res, 'reset')(error);
      } else {
        user.generateHash(user => {
          const mailer = new Mailer();
          const url = `https://zonaextrema.com.br/token/${user.hash}`;
          const template = `<a href="${url}">Clique pra trocar a senha</a>`;
          mailer.send({
            from: 'zonaextrema@produtoreativo.com.br',
            to: user.email,
            subject: 'Biohacking from Produto Reativo: Reset Password',
            content: `Alguém com o email ${req.body.email} solicitou troca de senha, ${template}`,
          }).then((response) => {
            console.log(response.statusCode);
            console.log(response.body);
            console.log(response.headers);
            res.send({
              message: 'email_sent'
            })
          }).catch((error) => {
            console.log('Error', error);
            this.redirectErrors(res)({
              errors: [
                {
                  message: error.message,
                  type: 'Validation error',
                  path: 'mailer',
                }
              ]
            });
          });
        });
      }
    }).catch(this.redirectErrors(res));
  }

  logout(req, res) {
    req.logout();
    res.send({});
  }

  constructor(app, models) {
    const passport = app.get('passport');
    this.app = app;
    this.models = models;
    app.post('/api/register', this.create.bind(this));
    app.post('/api/login', passport.authenticate('local'), (req, res) => res.send(req.user));
    app.get('/api/logout', this.logout.bind(this));
    app.post('/api/reset/password', this.reset.bind(this));
    app.post('/api/change/password', this.change.bind(this));
  }
}

module.exports = Users;
