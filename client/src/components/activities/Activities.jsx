import moment from 'moment';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { mapActivitiesDispatchToProps } from 'api/actions';
import Activity from 'components/activities/Activity.jsx';
import ActivityEdit from 'components/activities/ActivityEdit.jsx';
import './Activities.css';

class Activities extends React.Component {

  static propTypes = {
    activities: PropTypes.arrayOf(PropTypes.object),
    mode: PropTypes.shape({
      state: PropTypes.string.isRequired,
      activity: PropTypes.object,
    }),
    request: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.request();
  }

  mapActivities = (activity) => {
    const { mode: { state, activity: act } } = this.props;
    return (state === 'edit' &&
      activity.id === act.id
    ) ?
      <ActivityEdit
        key={`act-${activity.id}`}
        activity={activity}
      /> :
      <Activity
        key={`act-${activity.id}`}
        activity={activity}
      />;
  }

  render() {
    const today = moment().format('MMM Do YYYY');
    const { activities } = this.props;
    const list = activities.map(this.mapActivities);
    return (
      <div className="activities">
        <h2>{today}</h2>
        {list}
      </div>
    );
  }
}

export default connect(
  ({ activities, mode }) => ({ activities, mode }),
  mapActivitiesDispatchToProps,
)(Activities);
