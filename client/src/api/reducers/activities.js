import actions from 'api/actions';

export default (state = [], { type, payload }) => {
  if (type === actions.activities.requestSucess) {
    return payload;
  }

  if (type === actions.activities.updateSuccess) {
    console.log('Reducer update success!');
    return payload;
  }

  return state;
}
