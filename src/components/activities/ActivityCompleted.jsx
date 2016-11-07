import React from 'react';
import moment from 'moment';
import Tags from 'components/activities/Tags.jsx';

const ActivityCompleted = ({ activity }) => {

  const { createdAt, updatedAt, color, description, kind} = activity;
  const date = moment(updatedAt).format('MMM Do YYYY');
  const datetime = moment(updatedAt).format('HH:mm');

  const style = {
    borderLeft: `1.5rem solid ${color}`,
  };

  const tags = (description) ? description : '';

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
  )
}

export default ActivityCompleted;
