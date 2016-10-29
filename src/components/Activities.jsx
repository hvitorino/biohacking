import React, { PropTypes } from 'react';
import Activity from './Activity.jsx';
import ActivityEdit from './ActivityEdit.jsx';

class Activities extends React.Component {

  state = {
    mode: '',
    activities: []
  }

  componentWillReceiveProps(nextProps) {
    this.fetch();
  }

  fetch = () => {
    const database = window.firebase.database().ref('/activities');
    database.once('value').then(result => {
      const json = result.val();
      const activities = Object.keys(json).map(key => json[key]);
      this.setState({
        mode: '',
        activities
      });
    });
  }

  onSave = (activity) => {
    const database = window.firebase.database().ref(`/activities/${activity.id}`);
    database.update(activity).then(this.fetch);
  }

  onEdit = (activity) => {
    this.setState({
      ...this.state,
      mode: 'edit',
      activity,
    });
  }

  mapActivities = (activity) => {
    const { mode, activity: edit } = this.state;
    const key = activity.id;
    return (mode === 'edit' && key === edit.id) ?
      <ActivityEdit
        activity={edit}
        key={key}
        onSave={this.onSave}
      /> :
      <Activity
        key={key}
        activity={activity}
        onClick={this.onEdit}
      />;
  }

  render () {
    const { activities, mode } = this.state;
    const container = activities.map(this.mapActivities, this);
    return (
      <div>{container}</div>
    )
  }
}

export default Activities;
