import React, { PropTypes } from 'react';
import Tags from 'components/kinds/Tags.jsx';

class Kind extends React.Component {

  state = {
    fields: {},
  }

  static childContextTypes = {
    updateForm: PropTypes.func,
  }

  getChildContext() {
    return {
      updateForm: this.updateForm,
    };
  }

  updateForm = (fieldName, value) => {
    const { fields } = this.state;
    this.setState({
      fields: {
        ...fields,
        [fieldName]: value,
      }
    });
  }

  render () {
    const { tags, color, description } = this.props;
    const style = {
      backgroundColor: color,
    }
    return (
      <div style={style} className="Kind">
        <button className="mdl-button description">{description}</button>
        <Tags tags={tags} />
      </div>
    );
  }
}

export default Kind;
