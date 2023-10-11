import axios from 'axios';

const http = token => {
  const headers = {};
  if (token) {
    headers.authorization = `Bearer ${token}`;
  }
  const instance = axios.create({
    baseURL: 'https://reqres.in',

    headers,
  });
  return instance;
};

export default http;
