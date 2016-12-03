import React, { PropTypes } from 'react';
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
    <div>
      <div className="remove" style={style}>

      </div>
      <div onClick={editWrapper} className="Activity">
        <div className="Kind" >
          {kind}
          <div className="datetime">
            {date}
          </div>
        </div>
        <Tags tags={tags} />
      </div>
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
