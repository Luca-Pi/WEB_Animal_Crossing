import axios from "axios";

const http = axios.create();

if (import.meta.env.PROD) {
  http.defaults.baseURL = "https://islandcrossing.anaelbonnafous.fr";
} else {
  http.defaults.baseURL = 'http://localhost:8000';
}

export default http;
