import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import actions, { nextAction } from 'api/actions';

const createConfig = (method = 'GET', payload = {}) => {
  const config = {
    method,
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  if (method !== 'GET') {
    config.body = JSON.stringify(payload);
  }

  return config;
};

function executeFetch(id, entityUrl, method, payload) {
  const url = (id) ? `/api/${entityUrl}/${id}` : `/api/${entityUrl}`;
  return fetch(url, createConfig(method, payload))
          .then((response) => {
            if (response.status >= 400) {
              return response.json().then(({ messages }) => {
                const error = messages.reduce((errors, message) => {
                  errors[message.path] = message;
                  return errors;
                }, {});
                return { error, statusCode: response.status };
              });
            }
            return response.json();
          })
          .then(json => json);
}

const failure = (payload, type) => ({
  type: `${type}_ERROR`,
  payload,
});

export function* prepareSaga(action) {
  console.log('Entrou na saga de CRUDs', action);
  const { payload } = action;
  const id = (payload) ? payload.id : null;
  const { success } = nextAction(action.type);
  const payback = yield call(executeFetch,
                          id,
                          action.entity,
                          action.method,
                          action.payload,
                        );
  if (payback.error) {
    yield put(failure(payback, action.type));
    if (payback.statusCode === 401) {
      yield put(push('/login'));
    }
  } else {
    yield put(success(payback));
  }
}

/**
 * Se precisar de regex, veja
 * https://github.com/yelouafi/redux-saga/issues/392
 */
export function* watchEntities() {
  yield* takeEvery([
    actions.kinds.request,
  ], prepareSaga);
}

//
// const filter = key => key.match(/REQUEST/) ||
//                       key.match(/CREATE/) ||
//                       key.match(/SAVE/) ||
//                       key.match(/DELETE/);
//
// export default function crudSagas(entityActions) {
//   console.log('CRUD SAGA', entityActions);
//   return function* watch() {
//     const mapEntries = Object.entries(entityActions)
//           .map(entrie => entrie[1])
//           .filter(filter);
//     console.log('disparou a saga?', mapEntries);
//     yield* takeEvery(mapEntries, prepareSaga);
//   };
// }
