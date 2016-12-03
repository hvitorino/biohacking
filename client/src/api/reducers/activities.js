import actions from 'api/actions.js';

export default (state = [], { type, payload }) => {

  if (type === actions.activities.requestSuccess ||
      type === actions.activities.searchSuccess) {
    return payload;
  }

  if (type === actions.activities.updateSuccess) {
    return [
      ...state.map((item) => {
        return (item.id === payload.id) ? payload : item;
      }),
    ];
  }

  if (type === actions.activities.createSuccess) {
    return [
      ...state,
      payload,
    ];
  }

  if (type === actions.activities.deleteSuccess) {
    return [
      ...state.filter((item) => {
        return item.id !== payload.id;
      }),
    ];
  }

  return state;
};
