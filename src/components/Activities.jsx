import React, { PropTypes } from 'react';
import Form from './Form.jsx';
import Activity from './Activity.jsx';

class Activities extends React.Component {

  state = {
    mode: '',
    activities: []
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.email) {
      this.fetch();
    }
  }

  fetch = () => {
    const database = window.firebase.database().ref('/activities');
    database.once('value').then(result => {
      const json = result.val();
      const activities = Object.keys(json).map(key => json[key]);
      this.setState({
        ...this.state,
        mode: '',
        activities
      });
    });
  }

  add = () => {
    this.setState({
      ...this.state,
      mode: 'add',
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
    return (
      <Activity
        key={activity.id}
        activity={activity}
        onClick={this.onEdit}
      />
    )
  }

  render () {
    const { email } = this.props;
    const { activities, mode } = this.state;
    const container = (mode === 'add') ?
      <Form onSave={this.onSave} /> : activities.map(this.mapActivities, this);
    return (
      <div>
        <div>
          <div>{email}</div>
          <button onClick={this.add}>Add</button>
        </div>
        <div>{container}</div>
      </div>
    )
  }
}

export default Activities;
