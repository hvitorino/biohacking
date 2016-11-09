import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Tags from 'components/activities/Tags.jsx';

const Activity = ({ activity, dispatch }) => {

  const { createdAt, updatedAt, color, description, kind} = activity;
  const datetime = (updatedAt) ?
    moment(updatedAt).format('HH:mm') :
    moment(createdAt).format('HH:mm');

  const style = {
    borderLeft: `1.5rem solid ${color}`,
  };

  const editWrapper = () => {
    dispatch({
      type: 'ACTIVITIES_EDIT',
      payload: activity,
    })
  };

  const tags = (description) ? description : '';

  return (
    <div onClick={editWrapper} className="Activity">
      <div className="Kind" style={style}>
        {kind}
        <div className="datetime">
          {datetime}
        </div>
      </div>
      <Tags description={tags} />
    </div>
  )
}


export default connect(null)(Activity);
