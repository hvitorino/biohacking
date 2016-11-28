import actions, { NAMESPACE } from 'api/actions.js';

function middleware(store) {
  return dispatch => (
    (action) => {

      console.log(action.type, action.payload);

      const keys = action.type.split('_');
      if (keys[0] === NAMESPACE) {
        const { user } = store.getState();
        const label = (user && user.id) ? `userId: ${user.id}` : '';
        window.ReactGA.event({
          category: keys[1],
          action: keys[2],
          label,
        });
      }

      // if (action.type === actions.activities.request) {
      //   fetch('/api/activities', {
      //     credentials: 'include',
      //     headers: {
      //       Accept: 'application/json',
      //       'Content-Type': 'application/json',
      //     },
      //     redirect: 'follow',
      //   }).then((response) => {
      //     return response.json();
      //   }).then(payload => {
      //     store.dispatch({
      //       payload: [
      //         {
      //           kind: 'EAT'
      //         }
      //       ],
      //       type: actions.activities.requestSuccess,
      //     })
      //   });
      // }


      return dispatch(action);
    }
  );
}

export default middleware;
