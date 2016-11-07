import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { activityMapToDispatch } from 'api/actions';
import ActivityCompleted from 'components/activities/ActivityCompleted.jsx';
import './Activities.css';

class Search extends React.Component {

  componentDidMount() {
    this.props.doSearch();
  }

  mapActivities = (activity) => (<ActivityCompleted key={activity.id} activity={activity} />)

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

export default connect(mapPropsToState, activityMapToDispatch)(Search);
