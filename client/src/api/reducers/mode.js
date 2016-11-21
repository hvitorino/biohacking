import actions from 'api/actions.js';

const initialState = ({ state, activity }) => ({
  activity,
  state,
});

export default (state = initialState({ state: 'listing' }), { type, payload: activity }) => {
  if (type === 'ACTIVITIES_EDIT') {
    return initialState({
      state: 'edit',
      activity,
    });
  }
  if (type === actions.activities.request) {
    return initialState({
      state: 'listing',
    });
  }
  return state;
};
