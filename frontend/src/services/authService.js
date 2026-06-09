import API from "../api/api";

export const signup = async (formData) => {
  // ❌ Pehle thha: "/api/auth/signup"
  // ✅ Ab hai: "/auth/signup"
  const res = await API.post("/auth/signup", formData);
  localStorage.setItem("token", res.data.token);
  return res.data;
};

export const signin = async (formData) => {
  // ✅ Removed "/api" prefix
  const res = await API.post("/auth/signin", formData);
  localStorage.setItem("token", res.data.token);
  return res.data;
};

export const getMe = async () => {
  // ✅ Removed "/api" prefix
  const res = await API.get("/auth/me");
  return res.data;
};