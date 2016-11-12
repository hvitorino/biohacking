class Activities {

  getActivities(req, res) {
    this.models.Activities.findAll().then(activities => {
      activities.forEach(activity => {
        activity.setDataValue('Something really cool here ...');
      });
      res.send(kinds);
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
    this.app = app;
    this.models = models;
    app.get('/api/activities', this.getActivities.bind(this));
    app.post('/api/activities', this.postActivity.bind(this));
  }
}

module.exports = Activities;
