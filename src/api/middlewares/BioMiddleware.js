import { push } from 'react-router-redux';

const callGoogle = (store) => {
  const auth = new window.firebase.auth();
  const provider = new window.firebase.auth.GoogleAuthProvider();
  provider.addScope('email');
  auth.signInWithPopup(provider).then(({ user: payload }) => {
    store.dispatch({
      type: 'USER_LOADED',
      payload,
    });
  });
}

function middleware(store) {

  return function(dispatch) {

    return function(action) {

      console.log(action);

      if (action.type === 'USER_LOGOUT') {
        window.firebase.auth().signOut().then(() => {
          store.dispatch(push('/activities'));
        }, function(error) {
          console.log("Error", error);
        });
      }

      if (action.type === 'USER_LOGGED') {
        store.dispatch(push('/activities'));
      }

      if (action.type === 'USER_LOGIN') {
          const auth = new window.firebase.auth();
          auth.onAuthStateChanged(
            payload => {
              if (payload) {
                store.dispatch({
                  type: 'USER_LOADED',
                  payload,
                });
              } else {
                callGoogle(store);
              }
            },
            (error) => {
              callGoogle(store);
            }
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
