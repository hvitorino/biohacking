function middleware(store) {

  return function(dispatch) {

    return function(action) {

      console.log(action);

      if (action.type === 'USER_LOGIN') {
          const auth = new window.firebase.auth();
          auth.onAuthStateChanged(
            payload => {
              if (payload) {
                store.dispatch({
                  type: 'USER_LOADED',
                  payload,
                });
              }
            },
            () => {}
          );
      }

      if (action.type === 'ACTIVITIES_REQUEST') {
        const ref = window.firebase.database().ref('activities');
        ref.once('value').then(result => {
          const json = result.val();
          const payload = Object.keys(json).map(key => json[key]);
          store.dispatch({
            type: 'ACTIVITIES_REQUEST_SUCCESS',
            payload,
          });
        })
      }

      if (action.type === 'KINDS_REQUEST') {
        const kinds = window.firebase.database().ref('/kinds');
        kinds.once('value').then(list => {
          const payload = list.val();
          store.dispatch({
            type: 'KINDS_REQUEST_SUCCESS',
            payload,
          });
        });
      }

      return dispatch(action);
    }
  }

}

export default middleware;
