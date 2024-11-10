import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:9999/',
  timeout: 3000,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export default instance;
