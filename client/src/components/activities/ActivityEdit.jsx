import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { mapActivitiesDispatchToProps } from 'api/actions';
import FormContainer from 'components/fields/Form.jsx';
import TextField from 'components/fields/TextField.jsx';

class ActivityEdit extends React.Component {

  static propTypes = {
    update: PropTypes.func.isRequired,
    activity: PropTypes.shape({
      loggedAt: PropTypes.string,
      color: PropTypes.string,
      tags: PropTypes.arrayOf(PropTypes.string),
      kind: PropTypes.string,
    }),
  };

  componentDidMount() {
    const { activity } = this.props;
    this.form.setValues(activity);
  }

  onEnter = (event) => {
    if (event.key === 'Enter') {
      const activity = this.form.getValues();
      this.props.update(activity);
      event.preventDefault();
      event.stopPropagation();
    }
  }

  render() {
    const { activity: { loggedAt, kind, color } } = this.props;
    const date = moment(loggedAt).format('HH:mm');
    const style = {
      borderLeft: `1.5rem solid ${color}`,
    };

    return (
      <div className="Activity">
        <div className="Kind" style={style}>
          {kind}
          <div className="datetime">
            {date}
          </div>
        </div>
        <FormContainer ref={form => (this.form = form)}>
          <div className="description">
            <TextField
              name="description"
              onKeyPress={this.onEnter}
            />
          </div>
        </FormContainer>
      </div>
    );
  }
}

export default connect(null, mapActivitiesDispatchToProps)(ActivityEdit);
