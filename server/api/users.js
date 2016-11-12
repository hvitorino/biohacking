class Users {

  constructor(app, models) {
    const passport = app.get('passport');
    this.app = app;
    this.models = models;
    app.post('/api/login', passport.authenticate('local'), (req, res) => res.send(req.user));
  }
}

module.exports = Users;
