// https://www.elastic.co/guide/en/elasticsearch/reference/2.3/query-filter-context.html
// const elasticsearch = require('elasticsearch');
// const connectionString = process.env.SEARCHBOX_SSL_URL;
// const client = new elasticsearch.Client({ host: connectionString });
//
// models = require('./server/models')
// LastTags = require('./server/api/services/lastTags.js')
// models.Activity.findAll({where: { UserId: 1 }}).then(list =>
//   list.forEach(activity => {
//     const indexer = new LastTags(models, client);
//     indexer.update(activity);
//   })
// )

const moment = require('moment');

class LastTags {

  constructor(models, elasticsearch) {
    this.elasticsearch = elasticsearch;
    this.models = models;
  }

  update(activity) {
    const pattern = /\#([^\s]+)/g;

    activity.reload({
      include: {
        model: this.models.Kind,
        attributes: ['id', 'color', 'description'],
      },
    }).then((activity) => {
      const json = activity.toJSON();
      const { id, secret, description, loggedAt, UserId, KindId } = json;
      const { color, description: kind } = json.Kind;
      const tags = description.split(pattern).filter(item => item.trim());
      const body = { id, secret, description, loggedAt, UserId, KindId, color, kind, tags };

      this.elasticsearch.index({
        index: 'activities',
        type: 'activity',
        id,
        body,
      }, (error, response) => console.log(error, response));
    });

    // this.models.Activity.findAll({
    //   where: {
    //     UserId: 1,
    //     KindId: 1,
    //     createdAt: {
    //       $gt: moment().subtract(3, 'months').toDate()
    //     }
    //   }
    // }).then(list => {
    //   const descriptions = list.map(({ description }) => description ).join(' ').split(pattern);
    //   descriptions.filter(item => item.trim())
    // })
  }

}

module.exports = LastTags;
