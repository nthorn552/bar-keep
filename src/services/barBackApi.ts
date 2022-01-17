import axios from 'axios';

const API_HANDLER_BASE_URL = 'http://localhost:8000';
// const API_HANDLER_BASE_URL = 'http://localhost:8080/api';

export default axios.create({
  baseURL: API_HANDLER_BASE_URL,
  responseType: "json",
  headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
});