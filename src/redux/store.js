import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from './MovieSlice';
import userReducer from "./userSlice";

export const store = configureStore({
    reducer: {
        movies: moviesReducer, // now matches useSelector(state => state.movies)
        user:userReducer,
    }
});
