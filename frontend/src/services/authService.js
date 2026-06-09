import API from "../api/api";

export const signup = async (formData) => {
  const res = await API.post("/api/auth/signup", formData);
  localStorage.setItem("token", res.data.token);
  return res.data;
};

export const signin = async (formData) => {
  const res = await API.post("/api/auth/signin", formData);
  localStorage.setItem("token", res.data.token);
  return res.data;
};

export const getMe = async () => {
  const res = await API.get("/api/auth/me");
  return res.data;
};


