import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import actions from 'api/actions';
import defaultFetch from 'api/sagas/fetch/defaultFetch.js';

export function* prepareSaga() {
  const payload = yield call(defaultFetch, '/api/logout');
  yield put({ type: actions.user.loaded, payload });
  yield put(push('/login'));
}

export default function* watchLogout() {
  yield* takeLatest(actions.user.logout, prepareSaga);
}
