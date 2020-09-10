import axios from "axios";

const API_ENDPOINT = process.env.VUE_APP_API || 'http://192.168.1:3000/';
// http://192.168.1.5:8080/
const api = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    "Access-Control-Allow-Origin": "*",
}
});

export default api;