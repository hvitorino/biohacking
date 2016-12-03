const elasticsearch = require('elasticsearch');
const connectionString = process.env.SEARCHBOX_SSL_URL;
const moment = require('moment');
const Router = require('./router.js');
const LastTags = require('../services/lastTags.js');

class Activities extends Router {

  defineRoutes() {
    const { app } = this;
    app.get('/api/activities', this.validate.bind(this), this.getActivities.bind(this));
    app.post('/api/activities', this.validate.bind(this), this.create.bind(this));
    app.put('/api/activities/:id', this.validate.bind(this), this.update.bind(this));
    app.delete('/api/activities/:id', this.validate.bind(this), this.remove.bind(this));
  }

  getActivities(req, res) {
    const user = req.user;
    const client = new elasticsearch.Client({ host: connectionString });
    const { id: UserId } = user;
    client.search({
      index: 'activities',
      type: 'activity',
      body: {
        sort: [
          {
            loggedAt: {
              order: 'asc'
            }
          }
        ],
        query: {
          bool: {
            filter: [
              { term: { UserId } },
              {
                range: {
                  loggedAt: { gte: moment().startOf('day').format() }
                }
              }
            ]
          }
        }
      }
    }, (error, response) => {
      if (response && response.hits) {
        res.send(response.hits.hits.map(item => item._source));
      } else {
        res.send([]);
      }
      client.close();
    });

  }

  create(req, res) {
    const { user } = req;
    const { id: UserId } = user;
    const { KindId, description } = req.body;
    const loggedAt = moment().toDate();
    this.models.Activity.create({
      loggedAt,
      KindId,
      description,
      UserId,
    }).then((model) => {
      const tags = new LastTags(this.models, this.app.get('elasticsearch'));
      tags.update(model, activity => res.send(activity));
    }).catch(this.redirectErrors(res));
  }

  notFound(res) {
    this.redirectErrors(res)({
      errors: [
        {
          message: 'not_found',
          type: 'Not Found',
          path: 'activity',
        },
      ],
    });
  }

  update(req, res) {
    const { user, body, params } = req;
    const { id } = params;
    const { id: UserId } = user;
    this.models.Activity.findOne({
      where: { UserId, id },
    })
    .then((activity) => {
      if (activity) {
        activity.update(body, { fields: ['description'] })
                .then(() => {
                  const tags = new LastTags(this.models, this.app.get('elasticsearch'));
                  tags.update(activity, indexed => res.send(indexed));
                })
                .catch(this.redirectErrors(res));
      } else {
        this.notFound(res);
      }
    })
    .catch(this.redirectErrors(res));
  }

  remove(req, res) {
    const { user, params } = req;
    const { id } = params;
    const { id: UserId } = user;
    this.models.Activity.findOne({
      where: { UserId, id },
    })
    .then((activity) => {
      if (activity) {
        activity.destroy()
                .then(() => res.send(activity))
                .catch(this.redirectErrors(res));
      } else {
        this.notFound(res);
      }
    })
    .catch(this.redirectErrors(res));
  }

}

module.exports = Activities;
