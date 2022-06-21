import axios from "axios";

const http = axios.create();

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL as string;

if (!apiBaseUrl) {
  throw new Error("VITE_API_BASE_URL is not defined in env file");
} else {
  http.defaults.baseURL = 'http://localhost:8000';
}

http.defaults.baseURL = apiBaseUrl;

export default http;
