// frontend/src/lib/axios.js

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true, // important for cookies
});

export default api;