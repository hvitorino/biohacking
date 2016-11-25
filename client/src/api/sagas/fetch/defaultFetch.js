const createConfig = (method = 'GET', payload = {}) => {
  const config = {
    method,
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
  };

  if (method === 'POST' || method === 'PUT') {
    config.body = JSON.stringify(payload);
  }

  return config;
};


export const validateFetch = (response) => {
  const bioError = {
    error: {
      'server/internal': response.statusText || response.message,
    },
  };
  try {
    return response.json().then(json => (json)).catch(() => (bioError));
  } catch (err) {
    return bioError;
  }
};

function defaultFetch(url, payload = {}, method = 'GET') {
  return fetch(url, createConfig(method, payload)).then((response) => {
    if (response.status >= 400) {
      return validateFetch(response);
    }
    return response.json();
  }).then(json => json).catch((error) => {
    return validateFetch(error);
  });
}

export default defaultFetch;
