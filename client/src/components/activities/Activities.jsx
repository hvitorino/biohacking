import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { activityMapToDispatch } from 'api/actions';
import Activity from 'components/activities/Activity.jsx';
import ActivityEdit from 'components/activities/ActivityEdit.jsx';
import './Activities.css';

class Activities extends React.Component {

  componentDidMount() {
    this.props.doRequest();
  }

  mapActivities = (activity) => {
    const { mode } = this.props;
    const key = activity.id;
    return (mode.state === 'edit' && key === mode.activity.id) ?
      <ActivityEdit key={key} activity={activity} /> :
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
    mode: state.mode,
  }
}

export default connect(mapPropsToState, activityMapToDispatch)(Activities);
