const LastTags = require('../services/lastTags.js');

class Kinds {

  getKinds(req, res) {
    const user = req.user;
    const { id: UserId } = user;
    const client = this.app.get('elasticsearch');
    const indexer = new LastTags(this.models, client);

    indexer.find(UserId).then(response => {
      const { buckets: kinds } = response.aggregations.kinds;
      const topTags = kinds.map(({ key, top_tags: { buckets: tags } }) => ({
        KindId: key,
        tags
      })).reduce((json, item) => {
        json[item.KindId] = item.tags;
        return json;
      }, {});
      this.models.Kind.findAll().then((kinds) => {
        kinds.forEach((kind) => {
          const tags = topTags[kind.id] || [];
          kind.setDataValue('tags', tags.map(tag => tag.key));
        });
        res.send(kinds);
      });
    });
  }

  constructor(app, models) {
    this.app = app;
    this.models = models;
    app.get('/api/kinds', this.getKinds.bind(this));
  }
}

module.exports = Kinds;
