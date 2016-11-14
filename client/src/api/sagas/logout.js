import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import actions from 'api/actions';

function executeFetch(payload) {
  return fetch('api/logout')
          .then(response => response.json())
          .then(json => json);
}

export function* prepareSaga(action) {
  console.log('Entrou na saga Logout:', action);
  const payload = yield call(executeFetch, action.payload);
    yield put({ type: actions.user.loaded, payload });
    yield put(push('/login'));
}

export default function* watchLogout() {
  yield* takeLatest(actions.user.logout, prepareSaga);
}
