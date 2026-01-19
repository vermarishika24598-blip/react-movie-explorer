import Popularmovies from "./utils/popularcard";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaRegHeart, FaHeart, FaRegBookmark, FaBookmark } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import {
  addToFavlistBackend,
  removeFromFavlistBackend,
  addToWatchlistBackend,
  removeFromWatchlistBackend
} from "../redux/MovieSlice";

export default function Popular() {
  const [popular, setPopular] = useState([]);
  const dispatch = useDispatch();
  const { favourite = [], watchlist = [] } = useSelector((state) => state.movie || {});

  useEffect(() => {
    Popularmovies().then(setPopular);
  }, []);

  const isWatchlisted = (movieId) => watchlist.some((m) => m.movieId === movieId);
const isFavourite = (movieId) => favourite.some((m) => m.movieId === movieId);

const handleWatchlistToggle = (movie) => {
  const movieInState = watchlist.find((m) => m.movieId === movie.id);
  if (movieInState) {
    dispatch(removeFromWatchlistBackend(movieInState.movieId));
  } else {
    dispatch(addToWatchlistBackend(movie));
  }
};

const handleFavouriteToggle = (movie) => {
  const movieInState = favourite.find((m) => m.movieId === movie.id);
  if (movieInState) {
    dispatch(removeFromFavlistBackend(movieInState.movieId));
  } else {
    dispatch(addToFavlistBackend(movie));
  }
};


  return (
    <div className="bg-black w-full px-6">
      <h1 className="text-white text-3xl font-bold mb-4 p-5">POPULAR</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {popular.map((movie) => (
          <Link
            key={movie.id}
            to={`/movie/${movie.id}`}
            className="bg-[#111] rounded-xl overflow-hidden shadow-xl hover:scale-105 transition duration-300"
          >
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-48 object-cover"
            />

            <div className="p-2 text-white">
              <h2 className="font-semibold truncate">{movie.title}</h2>
              <p className="line-clamp-2 text-sm text-gray-300">{movie.overview}</p>
              <h3 className="text-sm font-semibold mt-1">
                Rating: ⭐ {movie.rating || "N/A"}
              </h3>
            </div>

            {/* ICONS */}
            <div className="flex justify-between p-2">
              {/* WATCHLIST */}
              <button onClick={(e) => { e.preventDefault(); handleWatchlistToggle(movie); }}>
  {isWatchlisted(movie.id) ? <FaBookmark className="text-yellow-400 h-5" /> : <FaRegBookmark className="text-gray-400 h-5" />}
</button>

<button onClick={(e) => { e.preventDefault(); handleFavouriteToggle(movie); }}>
  {isFavourite(movie.id) ? <FaHeart className="text-red-500 h-5" /> : <FaRegHeart className="text-gray-400 h-5" />}
</button>

            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
