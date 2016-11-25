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
    const { mode } = this.props;
    const key = activity.id;
    return (mode.state === 'edit' && key === mode.activity.id) ?
      <ActivityEdit key={key} activity={activity} /> :
      <Activity key={key} activity={activity} />;
  }

  render() {
    const { activities } = this.props;
    const container = activities.map(this.mapActivities, this);
    return (
      <div>{container}</div>
    );
  }
}

const mapStateToProps = ({ activities, mode }) => ({ activities, mode });

export default connect(mapStateToProps, mapActivitiesDispatchToProps)(Activities);
