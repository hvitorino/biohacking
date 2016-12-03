import React from 'react';

class Snackbar extends React.Component {

  render() {
    return (
      <div className="mdl-snackbar mdl-snackbar--active" aria-hidden="false">
        <div className="mdl-snackbar__text">Can you save again?</div>
        <button type="button" className="mdl-snackbar__action">Undo</button>
      </div>
    )
  }
}

export default Snackbar;
