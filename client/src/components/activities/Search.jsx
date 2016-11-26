import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { mapSearchDispatchToProps } from 'api/actions';
import ActivityCompleted from 'components/activities/ActivityCompleted.jsx';
import './Activities.css';

class Search extends React.Component {

  static propTypes = {
    search: PropTypes.func,
    activities: PropTypes.arrayOf(PropTypes.object),
  }

  componentDidMount() {
    this.props.search();
  }

  mapActivities = activity => (<ActivityCompleted key={activity.id} activity={activity} />)

  render() {
    const { activities } = this.props;
    const container = activities.map(this.mapActivities, this);
    return (
      <div>{container}</div>
    );
  }
}

export default connect(({ activities }) => ({ activities }), mapSearchDispatchToProps)(Search);
