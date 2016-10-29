import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Kinds from './Kinds.jsx';
import uuid from 'uuid';

class Form extends React.Component {

  state = {
    id: uuid(),
    description: '',
    kind: '',
    color: '',
    userId: '',
  }

  // componentDidMount() {
  //   const { dispatch } = this.props;
  //   dispatch({
  //     type: 'USER_GET'
  //   });
  // }

  componentReceiveProps({ user }) {
    this.setState({
      ...this.state,
      userId: user.uid,
    })
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
    const { dispatch } = this.props;
    dispatch({
      type: 'ACTIVITY_UPDATE',
      payload: this.state,
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

export default connect(({ user }) => ({ user }))(Form);
