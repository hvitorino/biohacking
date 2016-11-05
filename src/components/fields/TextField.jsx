import React, { PropTypes } from 'react';
import uuid from 'uuid';

class TextField extends React.Component {

  state = {
    value: '',
    id: uuid(),
    focused: false,
    invalid: false,
    errors: [],
  }

  onFocus = () => {
    this.setState({
      ...this.state,
      focused: true,
    });
  }

  componentWillMount() {
    const { value, errors } = this.props;
    const focused = !!value;
    const invalid = !!errors;
    const newValue = (value) ? String(value) : '';
    this.setState({
      value: newValue,
      focused,
      invalid,
      errors: errors || []
    });
  }

  componentWillReceiveProps(nextProps) {
    const { value, errors } = nextProps;
    const focused = !!value;
    const invalid = !!errors;
    this.setState({
      value,
      focused,
      invalid,
      errors: errors || []
    });
  }

  mapErrors = () => {
    const errors = this.props.errors || [];
    return errors.map(error => (<b>{error}</b>));
  }

  handleBlur = () => {
    const { value } = this.state
    const focused = !!value;
    this.setState({
      ...this.state,
      focused,
    });
  }

  onChange = (event) => {
    const { value } = event.target;
    this.setState({
      ...this.state,
      value,
    }, () => {
      const { onChange } = this.props;
      if (onChange) {
        onChange(value);
      }
    });
  }

  render () {
    const { onChange, value, focused, invalid, id } = this.state;
    const { labelName, name, onClick, onKeyPress } = this.props;
    const isFocused = (focused) ? 'is-focused' : '';
    const isInvalid = (invalid) ? 'is-invalid' : '';
    const errors = this.mapErrors();
    return (
      <div
        key={id}
        className={`mdl-textfield mdl-js-textfield mdl-textfield--floating-label ${isInvalid} ${isFocused}`}>
        <input
          className="mdl-textfield__input"
          type="text"
          id={id}
          name={name}
          value={value}
          onChange={this.onChange}
          onFocus={this.onFocus}
          onBlur={this.handleBlur}
          onClick={onClick}
          onKeyPress={onKeyPress}
        />
      <label className="mdl-textfield__label" htmlFor={id}>{labelName}</label>
        <span className="mdl-textfield__error">{errors}</span>
      </div>
    );
  }
}

export default TextField;
