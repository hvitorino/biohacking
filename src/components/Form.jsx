import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import uuid from 'uuid';
import { activityMapToDispatch } from 'api/actions';
import Kinds from './Kinds.jsx';

class Form extends React.Component {

  state = {
    id: uuid(),
    description: '',
    kind: '',
    color: '',
    userId: '',
  }

  componentDidMount() {
    const { user: { uid: userId } } = this.props;
    const date = moment().toDate().getTime();
    this.setState({
      ...this.state,
      createdAt: date,
      updatedAt: date,
      userId,
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
    const { doUpdate } = this.props;
    doUpdate(this.state);
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

export default connect(({ user }) => ({ user }), activityMapToDispatch)(Form);
