import React from 'react';
import { connect } from 'react-redux';

const Activity = ({ activity, dispatch }) => {

  const style = {
    borderLeft: `10px solid ${activity.color}`,
  };

  const editWrapper = () => {
    dispatch({
      type: 'ACTIVITIES_EDIT',
      payload: activity,
    })
  };

  return (
    <div onClick={editWrapper} className="Activity">
      <div className="Kind" style={style}>
        {activity.kind}
      </div>
      <div className="description">
        {activity.description}
      </div>
    </div>
  )
}


export default connect(null)(Activity);
