import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { debounce } from 'lodash';
import { mapActivitiesDispatchToProps } from 'api/actions';
import FormContainer from 'components/fields/Form.jsx';
import TextField from 'components/fields/TextField.jsx';

class ActivityEdit extends React.Component {

  onEnter = (event) => {
    if (event.key === 'Enter') {
      const activity = this.form.getValues();
      this.props.update(activity);
      event.preventDefault();
      event.stopPropagation();
    }
  }

  componentDidMount() {
    const { activity } = this.props;
    this.form.setValues(activity);
  }

  render() {
    const { activity: { loggedAt, kind, color } } = this.props;
    const date = moment(loggedAt).format('HH:mm');
    const style = {
      borderLeft: `1.5rem solid ${color}`,
    };
    const onKeyPress = this.onEnter.bind(this);

    return (
      <div className="Activity">
        <div className="Kind" style={style}>
          {kind}
          <div className="datetime">
            {date}
          </div>
        </div>
        <FormContainer ref={(form) => (this.form = form)}>
          <div className="description">
            <TextField
              name="description"
              onKeyPress={onKeyPress}
            />
          </div>
        </FormContainer>
      </div>
    );
  }
}

export default connect(null, mapActivitiesDispatchToProps)(ActivityEdit);
