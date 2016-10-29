import React, { PropTypes } from 'react';

class ActivityEdit extends React.Component {

  state = {
    description: ''
  }

  onChange = ({ target: { value: description } }) => {
    this.setState({ description });
  }

  componentWillMount() {
    const { activity: { description } } = this.props;
    this.setState({ description });
  }

  render () {
    const { activity: { kind, color } } = this.props;
    const { description } = this.state;
    const style = {
      borderLeft: `10px solid ${color}`,
    };

    return (
      <div className="Activity">
        <div className="Kind" style={style}>
          {kind}
        </div>
        <div className="description">
          <input onChange={this.onChange} value={description} />
        </div>
      </div>
    );
  }
}

export default ActivityEdit;
