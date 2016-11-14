import { NAMESPACE } from 'api/actions';

function middleware(store) {
  return function(dispatch) {
    return function(action) {
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
      return dispatch(action);
    };
  };
}

export default middleware;
