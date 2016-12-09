import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import actions from 'api/actions';
import defaultFetch from 'api/sagas/fetch/defaultFetch.js';

export const failure = payload => ({
  type: actions.user.resetFailure,
  payload,
});

export function* prepareSaga(action) {
  const payload = yield call(defaultFetch, '/api/reset/password', action.payload, 'POST');
  const { error } = payload;
  if (error) {
    yield put(failure(error));
  } else {
    yield put({ type: actions.user.hasBeenReset, payload });
    yield put(push('/'));
  }
}

export default function* watchReset() {
  yield* takeLatest(actions.user.reset, prepareSaga);
}
