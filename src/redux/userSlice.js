import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch user info from backend
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const res = await fetch("http://localhost:5000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (!data) throw new Error("Failed to fetch user");

      // normalize: always include `name`
      const user = {
        ...data,
        name: data.name || data.username || "Guest",
      };

      return { user, token };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Safely load user from localStorage
let storedUser = null;
try {
  const userString = localStorage.getItem("user");
  storedUser = userString ? JSON.parse(userString) : null;
} catch (e) {
  console.warn("Invalid user in localStorage, clearing it.", e);
  localStorage.removeItem("user");
  storedUser = null;
}

const storedToken = localStorage.getItem("token") || null;

const initialState = {
  profile: storedUser,
  token: storedToken,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;

      // normalize
      state.profile = {
        ...user,
        name: user.name || user.username || "Guest",
      };
      state.token = token;

      localStorage.setItem("user", JSON.stringify(state.profile));
      localStorage.setItem("token", token);
    },
    logout: (state) => {
      state.profile = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload.user;
        state.token = action.payload.token;

        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch user";
      });
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
