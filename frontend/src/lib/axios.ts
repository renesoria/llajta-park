import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001', // Puerto de tu NestJS
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;