import React, { PropTypes } from 'react'

class ActivityEdit extends React.Component {

  state = {
    description: ''
  }

  onChange = (event) => {
    const { value: description } = event.target;
    this.setState({
      description,
    })
  }

  update = () => {
    const { activity, dispatch } = this.props;
    const { description } = this.state;
    dispatch("onSave", {
      ...activity,
      description,
    });
  }

  componentDidMount() {
    const { description } = this.props.activity;
    this.setState({
      description,
    })
  }

  render () {
    const { activity } = this.props;
    const { description } = this.state;
    return (
      <div className={`${activity.mode}`} key={`activity-${activity.id}`}>
        <input onChange={this.onChange} type="text" value={description} />
        <button onClick={this.update}>Salvar</button>
      </div>
    )
  }
}

export default ActivityEdit;
