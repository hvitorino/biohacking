import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import actions from 'api/actions';
import defaultFetch from 'api/sagas/fetch/defaultFetch.js';

const failure = payload => ({
  type: actions.user.changeFailure,
  payload,
});

export function* prepareSaga(action) {
  const payload = yield call(defaultFetch, '/api/change/password', action.payload, 'POST');
  const { error } = payload;
  if (error) {
    yield put(failure(error));
  } else {
    yield put({ type: actions.user.loaded, payload: {} });
    yield put(push('/'));
  }
}

export default function* changePassword() {
  yield* takeLatest(actions.user.change, prepareSaga);
}
