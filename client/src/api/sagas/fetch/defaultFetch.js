const createConfig = (method = 'GET', payload = {}) => {

  const config = {
    method,
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  if (method === 'POST' || method === 'PUT') {
    config.body = JSON.stringify(payload);
  }

  return config;
}


function defaultFetch(url, payload = {}, method = 'GET') {
  return fetch(url, createConfig(method, payload)).then((response) => {
    if (response.status >= 400) {
      try {
        return response.json().then(({messages}) => {
          const error = messages.reduce((errors, message) => {
            errors[message.path] = message;
            return errors;
          }, {});
          return { error };
        });
      } catch (e) {
        return {
          error: {
            'auth/login': response.statusText
          }
        }
      }
    }
    return response.json();
  }).then(json => json);
}

export default defaultFetch;
