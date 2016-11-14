import React, { PropTypes } from 'react';
import uuid from 'uuid';

class TextField extends React.Component {

  state = {
    value: '',
    id: uuid(),
    type: 'text',
    labelName: '',
    name: '',
    focused: false,
    invalid: false,
    errors: [],
  }

  static contextTypes = {
    updateForm: PropTypes.func,
  }

  onFocus = () => {
    this.setState({
      ...this.state,
      focused: true,
    });
  }

  componentWillMount() {
    const { value, errors, type, labelName, name } = this.props;
    const focused = !!value;
    const invalid = !!errors;
    const newValue = (value) ? String(value) : '';
    this.setState({
      value: newValue,
      focused,
      invalid,
      type,
      labelName,
      name,
      errors: errors || []
    });
  }

  componentWillReceiveProps(nextProps) {
    const { value: oldValue } = this.state;
    const { errors, value } = nextProps;
    const invalid = !!errors;
    const newValue = (value) ? String(value) : oldValue;
    const focused = !!newValue;
    this.setState({
      ...this.state,
      value: newValue,
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
    const { value } = this.state;
    const focused = !!value;
    this.setState({
      ...this.state,
      focused,
    });
  }

  onChange = (event) => {
    const { value } = event.target;
    const { name } = this.state;
    const { updateForm } = this.context;
    this.setState({
      ...this.state,
      value,
    }, () => {
      if (updateForm) {
        updateForm(name, value);
      }
    });
  }

  render () {
    const { type, labelName, name, focused, invalid, id, value } = this.state;
    const { onClick, onKeyPress } = this.props;

    const fieldType = (type) ? type : "text";
    const isFocused = (focused) ? 'is-focused' : '';
    const isInvalid = (invalid) ? 'is-invalid' : '';
    const errors = this.mapErrors();
    return (
      <div
        key={id}
        className={`mdl-textfield mdl-js-textfield mdl-textfield--floating-label ${isInvalid} ${isFocused}`}>
        <input
          className="mdl-textfield__input"
          type={fieldType}
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
