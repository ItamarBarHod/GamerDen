import axios from "axios";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

console.log(API_ENDPOINT);

const instance = axios.create({
  baseURL: API_ENDPOINT,
});

export default instance;
