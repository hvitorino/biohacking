class Activities {

  getActivities(req, res) {
    this.models.Activity.findAll().then(activities => {
      res.send(activities);
    });
  }

  postActivity(req, res) {
    const {id: UserId} = req.user;
    const activity = req.body;

    activity.UserId = UserId; //spread is not working

    this.models.Activity.create(activity).then((result) => {
      res.send('200');
    }).catch((error)=>{
      res.status(500).send({error})
    });
    res.send('200');
  }

  constructor(app, models) {
    const passport = app.get('passport');
    this.app = app;
    this.models = models;
    app.get('/api/activities', (req, res, next) => {
      const user = req.user;
      if (user) {
        next();
      } else {
        res.status(401).send({ messages: [
          {
            message: 'unlogged_user',
            type: 'Validation error',
            path: 'auth',
          }
        ] })
      }
    }, this.getActivities.bind(this));
    app.post('/api/activities', passport.authenticate('local'), this.postActivity.bind(this));
  }
}

module.exports = Activities;
