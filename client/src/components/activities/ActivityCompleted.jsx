import React, { PropTypes } from 'react';
import moment from 'moment';
import Tags from 'components/activities/Tags.jsx';

const ActivityCompleted = ({ activity }) => {
  const { loggedAt, color, description, kind } = activity;
  const date = moment(loggedAt).format('MMM Do YYYY');
  const datetime = moment(loggedAt).format('HH:mm');

  const style = {
    borderLeft: `1.5rem solid ${color}`,
  };

  const tags = description || '';

  return (
    <div className="Activity">
      <div className="Kind" style={style}>
        {kind}
        <div className="date">
          {date}
        </div>
        <div className="datetime">
          {datetime}
        </div>
      </div>
      <Tags description={tags} />
    </div>
  );
};

ActivityCompleted.propTypes = {
  activity: PropTypes.shape({
    loggedAt: PropTypes.string,
    color: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    kind: PropTypes.string,
  }),
};

export default ActivityCompleted;
