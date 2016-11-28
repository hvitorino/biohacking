import actions from 'api/actions.js';

const initialState = ({ state, activity }) => ({
  activity,
  state,
});

export default (state = initialState({ state: 'listing' }), { type, payload: activity }) => {
  if (type === actions.activities.edit) {
    return initialState({
      state: 'edit',
      activity,
    });
  }
  if (type === actions.activities.updateSuccess) {
    return initialState({
      ...state,
      state: 'listing',
    });
  }

  if (type === actions.activities.request) {
    return initialState({
      ...state,
      state: 'listing',
    });
  }
  return state;
};
