import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/Favlist";

export const fetchfavlist=createAsyncThunk(
    "/movie/fetchFavlist",
     async (_, { rejectWithValue }) =>{
        try{
            const token=localStorage.getItem("token");
            const res = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const addToWatchlistBackend = createAsyncThunk(
  "movie/addTofavlist",
  async (movie, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      // ✅ SEND EXACT BACKEND FORMAT
      const payload = {
        movieId: movie.id,
        title: movie.title,
        poster: movie.poster_path,
      };

      console.log("Sending payload:", payload);

      const res = await axios.post(`${API_URL}/add`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (err) {
      console.error(
        "Add to favlist error:",
        err.response?.data || err.message
      );
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const removeFromfavlistBackend = createAsyncThunk(
  "movie/removeFromfavlist",
  async (movieId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      await fetch(`${API_URL}/${movieId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return movieId;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

       