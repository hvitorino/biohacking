const elasticsearch = require('elasticsearch');
const connectionString = process.env.SEARCHBOX_SSL_URL;

// const client = new elasticsearch.Client({ host: connectionString });
//
// models = require('./server/models')
// LastTags = require('./server/api/services/lastTags.js')
// models.Activity.findAll({where: { UserId: 1 }}).then(list =>
//   list.forEach(activity => {
//     const indexer = new LastTags(models, client);
//     indexer.update(activity, (response) => {
//       console.log("Response", response);
//     });
//   })
// )


// const connectionString = process.env.SEARCHBOX_SSL_URL;
// const client = new elasticsearch.Client({ host: connectionString });
// models = require('./server/models')
// LastTags = require('./server/api/services/lastTags.js')
// const indexer = new LastTags(models, client);
// indexer.find(1).then((response) => console.log(JSON.stringify(response)))

const moment = require('moment');

class LastTags {

  constructor(models) {
    this.models = models;
  }

  delete({ id }) {
    const client = new elasticsearch.Client({ host: connectionString });
    return client.delete({ index: 'activities', type: 'activity', id });
  }

  find(UserId) {
    const client = new elasticsearch.Client({ host: connectionString });
    const json = {
      index: 'activities',
      body: {
        "query": {
          "bool": {
            "filter": [
              {
                "term": {
                  "UserId": UserId
                }
              }
            ]
          }
        },
        "aggs": {
          "kinds": {
            "terms": {
              "field": "KindId"
            },
            "aggs": {
              "top_tags": {
                "terms": {
                  "field": "description"
                }
              }
            }
          }
        }
      }
    };
    return client.search(json);
  }

  update(activity, callback) {
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
      const client = new elasticsearch.Client({ host: connectionString });
      client.index({
        index: 'activities',
        type: 'activity',
        refresh: true,
        id,
        body,
      }, () => callback(body));
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
