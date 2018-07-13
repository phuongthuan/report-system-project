import axios from 'axios';

const token = localStorage.getItem('token');
const defaultOptions = {
  headers: {
    'Authorization': token ? `Bearer ${token}` : '',
  }
}

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
  return axios[type](url,{ ...defaultOptions, ...options })
    .then(checkStatus)
    .then(parseJSON);
}
