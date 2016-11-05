import React from 'react';

const Activity = ({ activity, onClick }) => {

  const style = {
    borderLeft: `10px solid ${activity.color}`,
  };

  const editWrapper = () => {

    onClick({
      type: ''
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


export default Activity;
