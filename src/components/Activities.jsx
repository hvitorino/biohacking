import React, { PropTypes } from 'react';
import ActivityEdit from 'components/ActivityEdit.jsx';

class Activities extends React.Component {

  onEdit = (activity) => {
    this.props.dispatch('onEdit', activity);
  }

  onRemove = (activity) => {
    this.props.dispatch('onRemove', activity);
  }

  mapActivities = (activity) => {

    const Activity = (activity) => (
      <div className={`${activity.mode}`} key={`activity-${activity.id}`}>
        {activity.description}
        <button onClick={this.onEdit.bind(this, activity)}>Editar</button>
        <button onClick={this.onRemove.bind(this, activity)}>Remover</button>
      </div>
    );

    if (activity.mode === 'edit') {
      return <ActivityEdit
        dispatch={this.props.dispatch}
        key='edit-mode'
        activity={activity}
      />;
    }
    return Activity(activity);
  }

  render () {
    const list = this.props.activities.map(this.mapActivities);

    return (
      <div>
        {list}
      </div>
    );
  }
}

export default Activities;
