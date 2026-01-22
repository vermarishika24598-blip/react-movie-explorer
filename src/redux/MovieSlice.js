import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://movie-app-backend-6-qlen.onrender.com/api/watchlist";
const FAVLIST_API = "https://movie-app-backend-6-qlen.onrender.com/api/favlist";


/* ================= WATCHLIST THUNKS ================= */
export const fetchWatchlist = createAsyncThunk(
  "movie/fetchWatchlist",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data; // array of movies
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const addToWatchlistBackend = createAsyncThunk(
  "movie/addToWatchlist",
  async (movie, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found, please login");

      const payload = {
        movieId: movie.id,
        title: movie.title,
        poster: movie.poster || movie.poster_path || "",
      };

      console.log("[Watchlist] Adding movie:", payload);

      const res = await axios.post(`${API_URL}/add`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("[Watchlist] Added response:", res.data);
      return res.data; // saved movie object
    } catch (err) {
      console.error("[Watchlist] Add error:", err.response?.data || err.message);
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const removeFromWatchlistBackend = createAsyncThunk(
  "movie/removeFromWatchlist",
  async (movieId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found, please login");

      console.log("[Watchlist] Removing movieId:", movieId);

      await axios.delete(`${API_URL}/${movieId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("[Watchlist] Removed movieId:", movieId);
      return movieId;
    } catch (err) {
      console.error("[Watchlist] Remove error:", err.response?.data || err.message);
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

/* ================= FAVOURITES THUNKS ================= */
export const fetchFavlist = createAsyncThunk(
  "movie/fetchFavlist",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(FAVLIST_API, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const addToFavlistBackend = createAsyncThunk(
  "movie/addToFavlist",
  async (movie, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found, please login");

      const payload = {
        movieId: movie.id,
        title: movie.title,
        poster: movie.poster || movie.poster_path || "",
      };

      console.log("[Favlist] Adding movie:", payload);

      const res = await axios.post(`${FAVLIST_API}/add`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("[Favlist] Added response:", res.data);
      return res.data;
    } catch (err) {
      console.error("[Favlist] Add error:", err.response?.data || err.message);
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const removeFromFavlistBackend = createAsyncThunk(
  "movie/removeFromFavlist",
  async (movieId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found, please login");

      console.log("[Favlist] Removing movieId:", movieId);

      await axios.delete(`${FAVLIST_API}/${movieId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("[Favlist] Removed movieId:", movieId);
      return movieId;
    } catch (err) {
      console.error("[Favlist] Remove error:", err.response?.data || err.message);
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

/* ================= SLICE ================= */
const initialState = {
  favourite: [],
  watchlist: [],
  status: "idle",
};

const moviesSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    addToFavourite: (state, action) => {
      if (!state.favourite.some((m) => m.movieId === action.payload.movieId)) {
        state.favourite.push(action.payload);
      }
    },
    removeFromFavourite: (state, action) => {
      state.favourite = state.favourite.filter(
        (m) => m.movieId !== action.payload.movieId
      );
    },
  },
  extraReducers: (builder) => {
    builder
      /* ================= WATCHLIST ================= */
      .addCase(fetchWatchlist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWatchlist.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.watchlist = action.payload || [];
      })
      .addCase(fetchWatchlist.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(addToWatchlistBackend.fulfilled, (state, action) => {
        // push only if movieId doesn't exist
        if (!state.watchlist.some((m) => m.movieId === action.payload.movieId)) {
          state.watchlist.push(action.payload);
        }
      })
      .addCase(removeFromWatchlistBackend.fulfilled, (state, action) => {
        state.watchlist = state.watchlist.filter(
          (m) => m.movieId !== action.payload
        );
      })

      /* ================= FAVOURITES ================= */
      .addCase(fetchFavlist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFavlist.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.favourite = action.payload || [];
      })
      .addCase(fetchFavlist.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(addToFavlistBackend.fulfilled, (state, action) => {
        if (!state.favourite.some((m) => m.movieId === action.payload.movieId)) {
          state.favourite.push(action.payload);
        }
      })
      .addCase(removeFromFavlistBackend.fulfilled, (state, action) => {
        state.favourite = state.favourite.filter(
          (m) => m.movieId !== action.payload
        );
      });
  },
});

export const { addToFavourite, removeFromFavourite } = moviesSlice.actions;
export default moviesSlice.reducer;
