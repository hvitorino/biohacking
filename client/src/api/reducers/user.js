import actions from 'api/actions';

export default (state = {}, { type, payload }) => {
  if (type === actions.user.logged) {
    return payload;
  }
  return state;
}
