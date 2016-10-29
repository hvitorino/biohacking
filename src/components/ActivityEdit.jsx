import React, { PropTypes } from 'react';
import { debounce } from 'lodash';

class ActivityEdit extends React.Component {

  state = {
    description: ''
  }

  onSave = debounce(() => {
    const { dispatch } = this.props;
    dispatch({
      type: 'ACTIVITY_UPDATE',
      payload: this.state,
    });
  }, 3000);

  onChange = ({ target: { value: description } }) => {
    this.setState({ description }, this.onSave);
  }

  onEnter = (event) => {
    const { dispatch } = this.props;
    if (event.key === 'Enter') {
      dispatch({
        type: 'ACTIVITY_UPDATE',
        payload: this.state,
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
      borderLeft: `10px solid ${color}`,
    };
    const onKeyPress = this.onEnter.bind(this);

    return (
      <div className="Activity">
        <div className="Kind" style={style}>
          {kind}
        </div>
        <div className="description">
          <input onKeyPress={onKeyPress} onChange={this.onChange} value={description} />
        </div>
      </div>
    );
  }
}

export default ActivityEdit;
