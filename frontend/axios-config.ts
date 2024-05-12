import axios from 'axios';

axios.defaults.withCredentials = true;

const instance = axios.create({
  baseURL: 'http://localhost:3000',  /*http://127.0.0.1:3000 nel caso stiamo facendo in locale
                                     https://easymeal-backend-dev-edgn.1.ie-1.fl0.io      nel caso stiamo facendo da remoto con fl0*/
  withCredentials: true,
  timeout: 5000,
});

export default instance;
