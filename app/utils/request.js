import axios from 'axios';

(function() {
  const auth = JSON.parse(localStorage.getItem('auth'));

  const token = auth
    ? auth.access_token
    : null;

  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    axios.defaults.headers.common['Authorization'] = null;
  }
})();

function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.data;
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export default function request(type, url, options) {
  return axios[type](url, options)
    .then(checkStatus)
    .then(parseJSON);
}
