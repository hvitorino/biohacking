import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
import { mapActivitiesDispatchToProps } from 'api/actions';
import FormContainer from 'components/fields/Form.jsx';
import TextField from 'components/fields/TextField.jsx';

class ActivityEdit extends React.Component {

  onEnter = (event) => {
    if (event.key === 'Enter') {
      console.log('mandou salvar');
    }
  }

  componentWillMount() {
    const { activity } = this.props;
    this.setState({ ...activity });
  }

  render() {
    const { activity: { kind, color } } = this.props;
    const { description } = this.state;
    const style = {
      borderLeft: `1.5rem solid ${color}`,
    };
    const onKeyPress = this.onEnter.bind(this);

    return (
      <div className="Activity">
        <div className="Kind" style={style}>
          {kind}
        </div>
        <FormContainer>
          <div className="description">
            <TextField
              onKeyPress={onKeyPress}
              value={description}
            />
          </div>
        </FormContainer>
      </div>
    );
  }
}

export default connect(null, mapActivitiesDispatchToProps)(ActivityEdit);
