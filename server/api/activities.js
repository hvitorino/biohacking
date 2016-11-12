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
    console.log('This really should save the activity3 ...');
    console.log(req.body);

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
