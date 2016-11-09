class Kinds {

  getKinds(req, res) {
    this.models.Kind.findAll().then(kinds => (res.send(kinds)));
  }

  constructor(app, models) {
    this.app = app;
    this.models = models;
    app.get('/api/kinds', this.getKinds.bind(this));
  }
}

module.exports = Kinds;
