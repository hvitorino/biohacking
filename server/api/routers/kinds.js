class Kinds {

  getKinds(req, res) {
    this.models.Kind.findAll().then((kinds) => {
      kinds.forEach((kind) => {
        kind.setDataValue('tags', ['#88kg', '#vaigordinho', '#maromba', '#desceateochao']);
      });
      res.send(kinds);
    });
  }

  constructor(app, models) {
    this.app = app;
    this.models = models;
    app.get('/api/kinds', this.getKinds.bind(this));
  }
}

module.exports = Kinds;
