import React, { PropTypes } from 'react';
import Kinds from './Kinds.jsx';
import uuid from 'uuid';

class Form extends React.Component {

  state = {
    description: '',
    kind: '',
    color: ''
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
    const { onSave } = this.props;
    if (onSave) {
      onSave(this.state);
    }
  }

  componentWillMount() {
    this.setState({
      ...this.state,
      id: uuid(),
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
