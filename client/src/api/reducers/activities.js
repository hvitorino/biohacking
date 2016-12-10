import Immutable from 'immutable';
import actions from 'api/actions.js';

const factory = (json) => ({
  id: '',
  loggedAt: '',
  color: '',
  kind: '',
  ...json,
});
const Activity = Immutable.Record(factory());

//import Activity, { factory } from 'api/models/Activity.js';

export default (state = Immutable.List([]), { type, payload }) => {
  if (type === actions.activities.requestSuccess ||
      type === actions.activities.searchSuccess) {
    return Immutable.List(payload.map(({
        id, loggedAt, color, kind
    }) => new Activity({
      id, loggedAt, color, kind
    })));
  }

  if (type === actions.activities.updateSuccess) {
    return [
      ...state.map(item => ((item.id === payload.id) ? payload : item)),
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
      ...state.filter(item => (item.id !== payload.id)),
    ];
  }

  return state;
};
