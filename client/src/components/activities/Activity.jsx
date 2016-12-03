import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Hammer from 'react-hammerjs';
import moment from 'moment';
import { mapActivitiesDispatchToProps } from 'api/actions';
import Tags from 'components/activities/Tags.jsx';

const Activity = ({ activity, edit, remove }) => {
  const { loggedAt, color, tags, kind } = activity;

  const date = moment(loggedAt).format('HH:mm');

  const style = {
    borderLeft: `1.5rem solid ${color}`,
  };

  const removeWrapper = () => (remove(activity));

  return (
    <div className="Activity">
      <Hammer onPress={removeWrapper}>
        <div className="Kind" style={style}>
          {kind}
          <div className="datetime">
            {date}
          </div>
        </div>
      </Hammer>
      <Tags tags={tags} />
    </div>
  );
};

Activity.propTypes = {
  edit: PropTypes.func.isRequired,
  activity: PropTypes.shape({
    loggedAt: PropTypes.string,
    color: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    kind: PropTypes.string,
  }),
}

export default connect(null, mapActivitiesDispatchToProps)(Activity);
