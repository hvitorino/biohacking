import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { mapSearchDispatchToProps } from 'api/actions';
import Filter from 'components/search/Filter.jsx';
import Activity from 'components/activities/Activity.jsx';
import '../activities/Activities.css';

class Search extends React.Component {

  static propTypes = {
    clean: PropTypes.func,
    activities: PropTypes.arrayOf(PropTypes.object),
  }

  componentWillMount() {
    this.props.clean([]);
  }

  mapActivities = activity => (<Activity key={activity.id} activity={activity} />)

  render() {
    const { activities } = this.props;
    const container = activities.map(this.mapActivities, this);
    return (
      <div>
        <Filter />
        {container}
      </div>
    );
  }
}

export default connect(({ activities }) => ({ activities }), mapSearchDispatchToProps)(Search);
