import Mailer from '../services/mailer';

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

  reset(req, res) {
    const User = this.models.User;
    User.findOne({
      where: {
        email: req.body.email,
      },
    }).then(user => {
      if (!user) {
        const error = {
          errors: [],
        };
        this.redirectErrors(res, 'reset')(error);
      } else {
        user.generateHash(user => {
          const mailer = new Mailer();
          const url = `${GLOBAL.Config.url}/token/${user.hash}`;
          const template = `<a href="${url}">Clique pra trocar a senha</a>`;
          mailer.send({
            from: 'feedback@produtoreativo.com.br',
            to: user.email,
            subject: 'Biohacking from Produto Reativo: Reset Password',
            content: 'Email para trocar a senha',
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

    app.post('/reset/password', this.reset.bind(this));
  }
}

module.exports = Users;
