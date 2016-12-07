import React, { PropTypes } from 'react';
import uuid from 'uuid';
import './TextField.css';

class TextField extends React.Component {

  static propTypes = {
    onClick: PropTypes.func,
    onKeyPress: PropTypes.func,
    value: PropTypes.string,
    errors: PropTypes.string,
    type: PropTypes.string,
    labelName: PropTypes.string,
    name: PropTypes.string,
  }

  static contextTypes = {
    updateForm: PropTypes.func,
    getValue: PropTypes.func,
  }

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
      errors: errors || [],
    });
  }

  componentWillReceiveProps(nextProps) {
    const { value: oldValue, name } = this.state;
    const { errors, value } = nextProps;
    const invalid = !!errors;

    let newValue = oldValue;
    if (value) {
      newValue = String(value);
    } else {
      const { getValue } = this.context;
      if (getValue) {
        const contextValue = getValue(name);
        if (contextValue) {
          newValue = String(contextValue);
        }
      }
    }

    const focused = !!newValue;
    this.setState({
      ...this.state,
      value: newValue,
      focused,
      invalid,
      errors: errors || [],
    });
  }

  onFocus = () => {
    this.setState({
      ...this.state,
      focused: true,
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

  handleBlur = () => {
    const { value } = this.state;
    const focused = !!value;
    this.setState({
      ...this.state,
      focused,
    });
  }

  mapErrors = () => {
    const errors = this.props.errors || [];
    return errors.map(error => (<b>{error}</b>));
  }

  render() {
    const { type, labelName, name, focused, invalid, id, value } = this.state;
    const { onClick, onKeyPress } = this.props;

    const fieldType = type || 'text';
    const isFocused = (focused) ? 'is-focused' : '';
    const isInvalid = (invalid) ? 'is-invalid' : '';
    const isHidden = (fieldType === 'hidden') ? 'isHidden' : '';
    const errors = this.mapErrors();
    const className = `mdl-textfield mdl-textfield--floating-label ${isInvalid} ${isFocused} ${isHidden}`;
    return (
      <div
        key={id}
        className={className}
      >
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
