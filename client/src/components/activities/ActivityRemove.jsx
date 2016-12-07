import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { mapActivitiesDispatchToProps } from 'api/actions';
import Tags from 'components/activities/Tags.jsx';

const ActivityRemove = ({ activity, onDelete }) => {
  const { loggedAt, kind, color, tags } = activity;
  const date = moment(loggedAt).format('HH:mm');
  const style = {
    borderLeft: `7rem solid ${color}`,
  };
  const deleteWrapper = () => (onDelete(activity));
  return (
    <div className="Activity">
      <div className="Kind" style={style}>
        <button className="mdl-button mdl-js-button mdl-button--icon" onClick={deleteWrapper} style={{ marginLeft: '-6rem' }}>
          <i className="material-icons">delete</i>
        </button>
        {kind}
        <div className="datetime">
          {date}
        </div>
      </div>
      <Tags tags={tags} />
    </div>
  );
};

ActivityRemove.propTypes = {
  onDelete: PropTypes.func.isRequired,
  activity: PropTypes.shape({
    loggedAt: PropTypes.string,
    color: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    kind: PropTypes.string,
  }),
};


export default connect(null, mapActivitiesDispatchToProps)(ActivityRemove);
