import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { kindsAction } from 'api/actions';
import Kind from 'components/kinds/Kind.jsx';
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

  onSave = (KindId, description) => {
    const {create} = this.props; //create from kindsAction

    console.log(Kind);
    console.log(description);
    this.state = {
      KindId,
      description,
    };

    create(this.state);
  }

  mapKinds = (kind) => (
    <Kind onSave={this.onSave} key={`kind-${kind.id}`} {...kind} />
  )

  render() {
    const { kinds } = this.props;
    const container = kinds.map(this.mapKinds, this);
    return (
      <div className="Grid">{container}</div>
    )
  }
}

export default connect(({ kinds, tags }) => ({ kinds, tags }), kindsAction)(Grid);
