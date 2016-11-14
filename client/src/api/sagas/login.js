import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import actions from 'api/actions';

function executeFetch(payload) {
  return fetch('api/login', {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then(response => {
      if (response.status >= 400) {
        return {
          error: {
            'auth/login': response.statusText
          }
        }
      }
      return response.json();
    })
    .then(json => json);
}

const failure = payload => ({
  type: actions.user.loginFailure,
  payload,
});

export function* prepareSaga(action) {
  console.log('Entrou na saga LOGIN:', action);
  const payload = yield call(executeFetch, action.payload);
  const { error } = payload;
  if (error) {
    yield put(failure(error));
  } else {
    yield put({ type: actions.user.logged, payload });
    yield put(push('/'));
  }
}

export default function* watchLogin() {
  yield* takeLatest(actions.user.login, prepareSaga);
}
