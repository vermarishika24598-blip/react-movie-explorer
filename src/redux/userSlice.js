import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch user info
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const res = await fetch("https://movie-app-backend-5-dxa1.onrender.com/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!data) throw new Error("Failed to fetch user");

      return { user: { ...data, name: data.name || data.username || "Guest" }, token };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// ✅ Async thunk to update user info (e.g., name)
export const updateUserBackend = createAsyncThunk(
  "user/updateUser",
  async (updatedUser, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const res = await fetch(`https://movie-app-backend-5-dxa1.onrender.com/api/auth/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedUser),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update user");
      }

      const data = await res.json();
      // normalize
      const user = { ...data, name: data.name || data.username || "Guest" };

      // update localStorage
      localStorage.setItem("user", JSON.stringify(user));

      return user;
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
  profile: null,
  token: localStorage.getItem("token"),
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.profile = { ...user, name: user.name || user.username || "Guest" };
      state.token = token;

      localStorage.setItem("user", JSON.stringify(state.profile));
      localStorage.setItem("token", token);
    },
   logout: (state) => {
  state.profile = null;
  state.token = null;
  localStorage.removeItem("token");
},

  },
  extraReducers: (builder) => {
    builder
      // fetchUser
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
      })

      // updateUserBackend
      .addCase(updateUserBackend.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserBackend.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(updateUserBackend.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update user";
      });
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
