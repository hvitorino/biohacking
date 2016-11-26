import React, { PropTypes } from 'react';

class Form extends React.Component {

  static propTypes = {
    onSubmit: PropTypes.func,
    children: PropTypes.element,
  }

  static childContextTypes = {
    updateForm: PropTypes.func,
  }

  state = {
    fields: {},
  }

  getChildContext() {
    return {
      updateForm: this.updateForm,
    };
  }

  onSubmit = () => {
    event.preventDefault();
    event.stopPropagation();
    const { onSubmit } = this.props;
    if (onSubmit) {
      onSubmit(this.state);
    }
  }

  setValues = (values) => {
    const { fields } = this.state;
    this.setState({
      fields: {
        ...fields,
        ...values,
      },
    });
  }

  getValues = () => (this.state.fields)

  updateForm = (fieldName, value) => {
    const { fields } = this.state;
    this.setState({
      fields: {
        ...fields,
        [fieldName]: value,
      },
    });
  }

  render() {
    const { children } = this.props;
    return (
      <form autoComplete="off" onSubmit={this.onSubmit}>{children}</form>
    );
  }
}

export default Form;
