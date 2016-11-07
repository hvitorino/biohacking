import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
import moment from 'moment';
import { activityMapToDispatch } from 'api/actions';
import TextField from 'components/fields/TextField.jsx';

class ActivityEdit extends React.Component {

  state = {
    description: ''
  }

  static childContextTypes = {
    updateForm: PropTypes.func,
  }

  getChildContext() {
    return {
      updateForm: this.updateForm,
    };
  }

  updateForm = (name, description) => {
    this.setState({
      ...this.state,
      description,
    }, this.onSave);
  }

  onSave = debounce(() => {
    const { doUpdate } = this.props;
    doUpdate({
      ...this.state,
    });
  }, 3000);

  onEnter = (event) => {
    const { doUpdate } = this.props;
    if (event.key === 'Enter') {
      doUpdate({
        ...this.state,
      });
    }
  }

  componentWillMount() {
    const { activity } = this.props;
    this.setState({ ...activity });
  }

  render () {
    const { activity: { kind, color } } = this.props;
    const { description } = this.state;
    const style = {
      borderLeft: `1.5rem solid ${color}`,
    };
    const onKeyPress = this.onEnter.bind(this);

    return (
      <div className="Activity">
        <div className="Kind" style={style}>
          {kind}
        </div>
        <div className="description">
          <TextField
            onKeyPress={onKeyPress}
            onChange={this.onChange}
            value={description}
          />
        </div>
      </div>
    );
  }
}

export default connect(null, activityMapToDispatch)(ActivityEdit);
