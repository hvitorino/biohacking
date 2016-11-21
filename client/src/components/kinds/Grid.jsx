import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { kindsAction } from 'api/actions';
import Kind from 'components/kinds/Kind.jsx';
import './Grid.css';

class Grid extends React.Component {

  static propTypes = {
    create: PropTypes.func,
    doRequest: PropTypes.func,
    kinds: PropTypes.arrayOf(PropTypes.object),
  }

  componentDidMount() {
    this.props.doRequest();
  }

  onSave = (KindId, description) => (this.props.create({ KindId, description }))

  mapKinds = kind => (
    <Kind onSave={this.onSave} key={`kind-${kind.id}`} {...kind} />
  )

  render() {
    const { kinds } = this.props;
    const container = kinds.map(this.mapKinds, this);
    return (
      <div className="Grid">{container}</div>
    );
  }
}

export default connect(({ kinds, tags }) => ({ kinds, tags }), kindsAction)(Grid);
