import React, { PropTypes } from 'react';

class Kinds extends React.Component {

  state = {
    kinds: [],
  }

  componentDidMount() {
    const kinds = window.firebase.database().ref('/kinds');
    kinds.once('value').then(list => {
      this.setState({
        ...this.state,
        kinds: list.val(),
      }, () => {
        const { onSelect } = this.props;
        const kind = this.state.kinds[0];
        if (onSelect) {
          onSelect(kind);
        }
      });
    });
  }

  onChange = (event) => {
    const { onSelect } = this.props;
    const { id } = event.target.selectedOptions[0].dataset;
    const kind = this.state.kinds.find(kind => kind.id == id);
    if (onSelect) {
      onSelect(kind);
    }
  }

  mapOptions = kind => (
    <option key={`kind-${kind.id}`} data-id={kind.id}>
      {kind.description}
    </option>
  )

  render () {
    const options = this.state.kinds.map(this.mapOptions);
    return (
      <select onChange={this.onChange}>
        {options}
      </select>
    );
  }
}

export default Kinds;
