import axios from "axios";

// Hardcoded for stability in production

const API = axios.create({
  baseURL: "https://movie-app-backend-6-qlen.onrender.com/api",
  withCredentials: true, // Yeh zaroori hai agar backend mein credentials true hai
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;