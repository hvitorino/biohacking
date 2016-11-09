import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

class Kinds extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'KINDS_REQUEST'
    });
  }

  onChange = (event) => {
    const { onSelect } = this.props;
    const { id } = event.target.selectedOptions[0].dataset;
    const kind = this.props.kinds.find(kind => kind.id == id);
    if (onSelect) {
      onSelect(kind);
    }
  }

  mapOptions = kind => (
    <option key={`kind-${kind.id}`} data-id={kind.id}>
      {kind.description}
    </option>
  )

  componentWillReceiveProps(nextProps) {
    const { onSelect, kinds  } = nextProps;
    if (kinds.length) {
      const kind = kinds[0];
      onSelect(kind);
    }
  }

  render () {
    const options = this.props.kinds.map(this.mapOptions);
    return (
      <select onChange={this.onChange}>
        {options}
      </select>
    );
  }
}

export default connect(({ kinds }) => ({ kinds }))(Kinds);
