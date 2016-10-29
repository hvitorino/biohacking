import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Activity from './Activity.jsx';
import ActivityEdit from './ActivityEdit.jsx';

class Activities extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'ACTIVITIES_REQUEST'
    });
  }

  mapActivities = (activity) => {
    const { mode, activity: edit } = this.props;
    const key = activity.id;
    return (mode === 'edit' && key === edit.id) ?
      <ActivityEdit activity={edit} key={key} /> :
      <Activity key={key} activity={activity} />;
  }

  render () {
    const { activities } = this.props;
    const container = activities.map(this.mapActivities, this);
    return (
      <div>{container}</div>
    )
  }
}

const mapPropsToState = (state) => {
  return {
    activities: state.activities,
  }
}

export default connect(mapPropsToState)(Activities);
