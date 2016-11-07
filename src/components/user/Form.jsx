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
    const { onSubmit } = this.props;
    if (onSubmit) {
      onSubmit(this.state);
    }
    event.preventDefault();
    event.stopPropagation();
  }

  render() {
    const { children } = this.props;
    return (
      <form onSubmit={this.onSubmit}>{children}</form>
    );
  }
}

export default Form;
