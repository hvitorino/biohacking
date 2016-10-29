import React, { PropTypes } from 'react';
import Kinds from './Kinds.jsx';
import uuid from 'uuid';

class Form extends React.Component {

  state = {
    id: uuid(),
    description: '',
    kind: '',
    color: '',
    userId: '',
  }

  onChange = (event) => {
    const description = event.target.value;
    this.setState({
      ...this.state,
      description,
    });
  }

  onSelect = ({ description: kind, color }) => {
    this.setState({
      ...this.state,
      kind,
      color,
    });
  }

  onSubmit = () => {
    dispatch({
      type: 'ACTIVITY_UPDATE',
      payload: this.state,
    });
  }

  render () {
    const { description } = this.state;
    return (
      <div>
        <Kinds onSelect={this.onSelect} />
        <input value={description} onChange={this.onChange} />
        <button onClick={this.onSubmit}>Save</button>
      </div>
    );
  }
}

export default Form;
