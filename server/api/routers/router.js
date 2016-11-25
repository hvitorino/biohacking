class Router {

  constructor(app, models) {
    this.app = app;
    this.models = models;
    this.defineRoutes();
  }

  defineRoutes() {}

  validate(req, res, next) {
    const user = req.user;
    if (user) {
      next();
    } else {
      this.redirectErrors(res)({
        errors: [
          {
            message: 'user_unlogged',
            type: 'Validation error',
            path: 'user',
          },
        ],
      });
    }
  }

  redirectErrors(res) {
    const logger = this.app.get('logger');
    return (error) => {
      logger.log('info', 'USER Error:', error);
      res.status(412).send({ messages: error.errors });
    };
  }

}

module.exports = Router;
