import axios from "axios";

// Baseline fallback matching to make sure development never breaks
const BASE_URL = process.env.REACT_APP_BACKEND_URL || "https://movie-app-backend-5-dxa1.onrender.com//api";

const API = axios.create({
  baseURL: BASE_URL,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;