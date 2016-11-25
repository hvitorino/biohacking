import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { mapActivitiesDispatchToProps } from 'api/actions';
import Tags from 'components/activities/Tags.jsx';

const Activity = ({ activity, edit }) => {

  const { loggedAt, color, tags, kind } = activity;
  const date = moment(loggedAt).format('HH:mm');

  const style = {
    borderLeft: `1.5rem solid ${color}`,
  };

  const editWrapper = () => (edit(activity));

  return (
    <div onClick={editWrapper} className="Activity">
      <div className="Kind" style={style}>
        {kind}
        <div className="datetime">
          {date}
        </div>
      </div>
      <Tags tags={tags} />
    </div>
  )
}

export default connect(null, mapActivitiesDispatchToProps)(Activity);
