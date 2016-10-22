import React, { PropTypes } from 'react';
import Kinds from 'components/Kinds.jsx';
import uuid from 'uuid';

class Form extends React.Component {

  state = {
    description: '',
    kind: '',
    id: null,
  }

  onSave = (event) => {
    const activity = this.state;
    if (!activity.id) {
      activity.id = uuid();
    }
    this.props.onSave(this.state);
  }

  onChange = (event) => {
    const { value } = event.target;
    this.setState({
      ...this.state,
      description: value,
    })
  }

  onSelect = ({ description }) => {
    this.setState({
      ...this.state,
      kind: description,
    });
  }

  render () {
    const { style } = this.props;
    const { description } = this.state;
    return (
      <div style={style}>
        <Kinds onSelect={this.onSelect} />
        <label htmlFor="description">
          Description
        </label>
        <input
          value={description}
          onChange={this.onChange}
          id="description"
          type="text"
        />
        <button onClick={this.onSave}>
          Cadastrar
        </button>
      </div>
    )
  }
}

export default Form;
