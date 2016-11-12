import { push } from 'react-router-redux';
import moment from 'moment';
import actions, { defaultAction } from 'api/actions';

const callGoogle = (store) => {
  const auth = new window.firebase.auth();
  const provider = new window.firebase.auth.GoogleAuthProvider();
  provider.addScope('email');
  auth.signInWithPopup(provider).then(({ user: payload }) => {
    store.dispatch({
      type: actions.user.loaded,
      payload,
    });
  });
}

const createUser = (user) => {
  const ref = window.firebase.database().ref(`users/${user.uid}`);
  ref.update(user);
}

function middleware(store) {

  return function(dispatch) {

    return function(action) {

      const catchLoginError = ({ code: key, message }) => {
        const { email, password } = action.payload;
        if (key === 'auth/user-not-found') {
          window.firebase.auth()
                  .createUserWithEmailAndPassword(email, password)
                  .then((user) => {
                    const { displayName, email, photoURL, uid } = user;
                    createUser({ displayName, email, photoURL, uid });
                    window.firebase.auth()
                                   .signInWithEmailAndPassword(email, password)
                                   .catch(catchLoginError);
                  })
                  .catch(catchLoginError);
        } else {
          const put = defaultAction(store.dispatch, actions.error.login);
          put({
            [key]: message
          });
        }
      }

      console.log(action);

      if (action.type === actions.user.login) {

        const auth = new window.firebase.auth();
        try {

          auth.onAuthStateChanged(
            payload => {
              if (payload) {
                const put = defaultAction(store.dispatch, actions.user.loaded);
                put(payload);
              } else {
                if (action.payload) {
                  const { email, password } = action.payload;
                  auth.signInWithEmailAndPassword(email, password)
                      .catch(catchLoginError);
                }
              }
            },
            (error) => {
              console.log("ERROR", error.code, error.message);
              const { email, password } = action.payload;
              auth.signInWithEmailAndPassword(email, password)
                  .catch(catchLoginError);
            }
          );
        } catch (e) {
          catchLoginError(e);
        }
      }

      if (action.type === actions.user.logout) {
        window.firebase.auth().signOut().then(() => {
          store.dispatch(push('/login'));
        }, function(error) {
          console.log("Error", error);
        });
      }

      if (action.type === actions.user.logged) {
        store.dispatch(push('/activities'));
      }

      if (action.type === actions.activities.request) {
        const { user } = store.getState();
        const startAt = moment().startOf('day').toDate().getTime();
        const ref = window.firebase.database().ref(`users/${user.uid}/activities`);
        ref
          .orderByChild("updatedAt")
          .startAt(startAt, 'updatedAt')
          .once('value').then(result => {
            const json = result.val();
            const payload = json==null ? {} : Object.keys(json).map(key => json[key]);
            store.dispatch({
              type: actions.activities.requestSucess,
              payload,
            });
          })
      }

      if (action.type === actions.activities.search) {
        const { user } = store.getState();
        const ref = window.firebase.database().ref(`users/${user.uid}/activities`);
        ref
          .orderByChild("updatedAt")
          .once('value').then(result => {
            const json = result.val();
            const payload = Object.keys(json).map(key => json[key]);
            store.dispatch({
              type: actions.activities.requestSucess,
              payload,
            });
          })
      }

      if (action.type === actions.activities.update) {
        const { payload } = action;
        const { userId } = payload;
        const ref = window.firebase.database().ref(`users/${userId}/activities/${payload.id}`);
        ref
          .update(payload)
          .then(() => {
            store.dispatch({
              type: actions.activities.request
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
