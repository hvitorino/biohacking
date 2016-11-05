const initialState = ({ state, activity }) => ({
  activity,
  state,
});

export default (state = initialState({state: 'listing'}), { type, payload: activity }) => {
  if (type === 'ACTIVITIES_EDIT') {
    return initialState({
      state: 'edit',
      activity,
    });
  }
  if (type === 'ACTIVITY_UPDATE_SUCCESS') {
    return initialState({
      state: 'listing',
    });
  }
  return state;
}
