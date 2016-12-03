const moment = require('moment');
const Router = require('./router.js');

class Search extends Router {

  defineRoutes() {
    const { app } = this;
    app.post('/api/search', this.validate.bind(this), this.search.bind(this));
  }

  search(req, res) {
    const { startLoggedAt, finishLoggedAt } = req.body;
    const user = req.user;
    const client = this.app.get('elasticsearch');
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
                  loggedAt: {
                    gte: moment(startLoggedAt, 'YYYY-MM-DD').format(),
                    lte: moment(finishLoggedAt, 'YYYY-MM-DD').format()
                  }
                }
              }
            ]
          }
        }
      }
    }, (error, response) => {
      if (response.hits && response.hits.hits) {
        res.send(response.hits.hits.map(item => item._source))
      } else {
        res.send([]);
      }

    });

  }

}

module.exports = Search;
