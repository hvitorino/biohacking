import React, { PropTypes } from 'react'

class Form extends React.Component {

  state = {
    fields: {},
  }

  static childContextTypes = {
    updateForm: PropTypes.func,
  }

  getChildContext() {
    return {
      updateForm: this.updateForm,
    };
  }

  updateForm = (fieldName, value) => {
    const { fields } = this.state;
    this.setState({
      fields: {
        ...fields,
        [fieldName]: value,
      }
    });
  }

  getValues = () => {
    return this.state.fields;
  }

  onSubmit = () => {
    event.preventDefault();
    event.stopPropagation();
    const { onSubmit } = this.props;
    if (onSubmit) {
      onSubmit(this.state);
    }
  }

  render() {
    const { children } = this.props;
    return (
      <form autoComplete="off" onSubmit={this.onSubmit}>{children}</form>
    );
  }
}

export default Form;
