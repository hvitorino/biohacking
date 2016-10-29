function middleware(store) {

  return function(dispatch) {

    return function(action) {

      console.log(action);

      if (action.type === 'ACTIVITIES_REQUEST') {
        const ref = window.firebase.database().ref('activities');
        ref.once('value').then(result => {
          const json = result.val();
          const payload = Object.keys(json).map(key => json[key]);
          store.dispatch({
            type: 'ACTIVITIES_REQUEST_SUCCESS',
            payload,
          })
        })
      }

      return dispatch(action);
    }
  }

}

export default middleware;
