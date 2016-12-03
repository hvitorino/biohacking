import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { debounce } from 'lodash';
import { mapActivitiesDispatchToProps } from 'api/actions';
import TextField from 'components/fields/TextField.jsx';
import Tags from 'components/activities/Tags.jsx';

class ActivityRemove extends React.Component {

  render() {
    const { activity: { loggedAt, kind, color, tags } } = this.props;
    const date = moment(loggedAt).format('HH:mm');
    const style = {
      borderLeft: `7rem solid ${color}`,
    };
    const deleteWrapper = () => { this.props.delete(this.props.activity); };

    return (
      <div className="Activity">
        <div className="Kind" style={style}>
          <button className="mdl-button mdl-js-button mdl-button--icon" onClick={deleteWrapper} style={{ marginLeft: "-6rem" }}>
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
  }
}

export default connect(null, mapActivitiesDispatchToProps)(ActivityRemove);
