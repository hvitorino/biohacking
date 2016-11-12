import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { kindsAction } from 'api/actions';
import Kind from 'components/kinds/Kind.jsx';
import Form from 'components/user/Form.jsx';
import './Grid.css';

class Grid extends React.Component {

  state = {
    Kind: null,
    description: ''
  }

  static childContextTypes = {
    updateForm: PropTypes.func,
  }

  getChildContext() {
    return {
      updateForm: this.updateForm,
    };
  }

  updateForm = (name, description) => {
    this.setState({
      ...this.state,
      description,
    });
  }

  componentDidMount() {
    this.props.doRequest();
  }

  mapKinds = (kind) => (
    <Kind key={`kind-${kind.id}`} {...kind} />
  )

  render() {
    const { kinds } = this.props;
    const container = kinds.map(this.mapKinds, this);
    return (
      <Form>
        <div className="Grid">{container}</div>
      </Form>
    )
  }
}

export default connect(({ kinds, tags }) => ({ kinds, tags }), kindsAction)(Grid);
