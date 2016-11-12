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
    this.models.Activity.create(req.body).then((result)=>{ //is async will broke the request??
      if(result) //how check this?
        res.send('200');
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
