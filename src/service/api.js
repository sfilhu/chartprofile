import axios from "axios";

const API_ENDPOINT = process.env.API || 'http://localhost:3000/';

const api = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    "Access-Control-Allow-Origin": "*",
}
});

export default api;