import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import actions from 'api/actions';
import defaultFetch from 'api/sagas/fetch/defaultFetch.js';

const failure = payload => ({
  type: actions.user.loginFailure,
  payload,
});

export function* prepareSaga(action) {
  const payload = yield call(defaultFetch, '/api/user');
  const { error } = payload;
  if (error) {
    yield put(failure(error));
  } else {
    localStorage.setItem('user', JSON.stringify(payload));
    yield put({ type: actions.user.logged, payload });
    yield put(push('/'));
  }
}

export default function* rememberMe() {
  yield* takeLatest(actions.user.rememberMe, prepareSaga);
}
