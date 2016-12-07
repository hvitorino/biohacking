import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { mapSearchDispatchToProps } from 'api/actions';
import FormContainer from 'components/fields/Form.jsx';
import TextField from 'components/fields/TextField.jsx';
import Button from 'components/fields/Button.jsx';

class Filter extends React.Component {

  static propTypes = {
    search: PropTypes.func,
  }

  filter = () => {
    const form = this.form;
    this.props.search(form.getValues());
  }

  render() {
    const formRef = (form) => { this.form = form; };

    return (
      <FormContainer ref={formRef} >
        <div>
          <TextField
            name="startLoggedAt"
            labelName="Start"
          />
          <TextField
            name="finishLoggedAt"
            labelName="Finish"
          />
          <Button onClick={this.filter} name="search" label="Search" />
        </div>
      </FormContainer>
    );
  }
}

export default connect(null, mapSearchDispatchToProps)(Filter);
