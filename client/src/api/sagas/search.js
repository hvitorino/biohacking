import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import actions from 'api/actions';
import defaultFetch from 'api/sagas/fetch/defaultFetch.js';

const failure = payload => ({
  type: actions.user.requestFailure,
  payload,
});

export function* prepareSaga(action) {
  const payload = yield call(defaultFetch, '/api/search', action.payload, 'POST');
  const { error, messages } = payload;
  if (error || messages) {
    yield put(failure(error || messages));
    yield put(push('/login'));
  } else {
    yield put({ type: actions.activities.searchSuccess, payload });
  }
}

export default function* search() {
  yield* takeLatest(actions.activities.search, prepareSaga);
}
