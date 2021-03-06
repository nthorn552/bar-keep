import axios from 'axios';

const BAR_BACK_HOST = 'http://localhost:8000';

export default axios.create({
  baseURL: BAR_BACK_HOST,
  responseType: "json",
  headers: {'Access-Control-Allow-Origin': '*'}
});