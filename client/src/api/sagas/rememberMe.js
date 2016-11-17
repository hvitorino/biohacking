import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import actions from 'api/actions';

function executeFetch() {
  return fetch('/api/user', {
    method: 'GET',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
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
  const payload = yield call(executeFetch);
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
