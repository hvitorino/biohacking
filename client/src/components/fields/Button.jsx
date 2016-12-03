import React, { PropTypes } from 'react';

class Button extends React.Component {

  static propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func,
  }

  onClick = (event) => {
    const { onClick } = this.props;
    event.preventDefault();
    event.stopPropagation();
    if (onClick) {
      onClick();
    }
  }

  render() {
    const { label, name } = this.props;
    return (
      <div className="reactivo-button">
        <button onClick={this.onClick} name={name} className="mdl-button mdl-button--raised mdl-button--colored">
          {label}
        </button>
      </div>
    );
  }
}

export default Button;
