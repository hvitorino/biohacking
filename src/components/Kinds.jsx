import React, { PropTypes } from 'react';

class Kinds extends React.Component {

  state = {
    kinds: [],
  }

  componentWillMount() {
    const kinds = window.firebase.database().ref('/kinds');
    kinds.once('value').then(list => {
      console.log(list.val())
      this.setState({
        ...this.state,
        kinds: list.val(),
      });
    })
  }

  onChange = (event) => {
    const { id } = event.target.selectedOptions[0].dataset;
    const kind = this.state.kinds.find(kind => kind.id == id);
    this.props.onSelect(kind);
  }

  mapOptions = (kind) => (<option key={kind.id} data-id={kind.id}>
    {kind.description}
  </option>)

  render () {
    const options = this.state.kinds.map(this.mapOptions, this);
    const onChange = this.onChange.bind(this);
    return (
      <select onChange={onChange}>
        {options}
      </select>
    );
  }
}

export default Kinds;
