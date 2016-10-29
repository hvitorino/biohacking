import React, { PropTypes } from 'react';

class Menu extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  }

  onLogout = () => {
    window.firebase.auth().signOut().then(function() {
      this.setState({
        email: ''
      });
    }, function(error) {
      console.log("Error", error);
    });
  }

  onNew = () => this.context.router.push('/new')

  render () {
    const { email } = this.props;
    const onNew = this.onNew.bind(this);
    return (
      <div>
        <div>{email}</div>
        <button onClick={onNew}>Add</button>
        <div>
          <a className="mdl-navigation__link" onClick={this.onLogout}>Logout</a>
        </div>
      </div>
    )
  }
}

export default Menu;
