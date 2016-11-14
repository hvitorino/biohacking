import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import actions from 'api/actions';

function executeFetch(payload) {
  return fetch('api/register', {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then(response => {
      if (response.status >= 400) {
        return response.json().then(({messages}) => {
          const error = messages.reduce((errors, message) => {
            errors[message.path] = message;
            return errors;
          }, {});
          return { error };
        });
      }
      return response.json();
    })
    .then(json => json);
}

const failure = payload => ({
  type: actions.user.registerFailure,
  payload,
});

export function* prepareSaga(action) {
  console.log('Entrou na saga REGISTER:', action);
  const payload = yield call(executeFetch, action.payload);
  const { error } = payload;
  if (error) {
    yield put(failure(error));
  } else {
    yield put({ type: actions.user.logged, payload });
    yield put(push('/'));
  }
}

export default function* watchRegister() {
  yield* takeLatest(actions.user.register, prepareSaga);
}
