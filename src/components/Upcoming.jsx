import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Upcomingmovies from "./utils/Upcomingdata";

import {
  addToFavlistBackend,
  removeFromFavlistBackend,
  addToWatchlistBackend,
  removeFromWatchlistBackend,
} from "../redux/MovieSlice";

import {
  FaRegHeart,
  FaHeart,
  FaRegBookmark,
  FaBookmark,
} from "react-icons/fa";

export default function Upcoming() {
  const [coming, setComing] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { favourite = [], watchlist = [] } = useSelector(
    (state) => state.movie || {}
  );

  useEffect(() => {
    Upcomingmovies().then(setComing);
  }, []);

  const isFavourite = (id) =>
  favourite.some((movie) => movie.movieId === id);


  const isWatchlisted = (id) =>
    watchlist.some((movie) => movie._id === id || movie.id === id);

  return (
    <div className="bg-black w-full px-4 pt-4">
      <h1 className="text-white font-bold text-3xl p-5">Upcoming</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 px-6">
        {coming.map((movie) => (
          <div
            key={movie.id}
            onClick={() => navigate(`/movie/${movie.id}`)}
            className="bg-[#111] rounded-xl overflow-hidden shadow-lg hover:scale-105 transition duration-300 cursor-pointer"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-48 object-cover"
            />

            <div className="p-2 text-white">
              <h1 className="text-sm font-semibold truncate">{movie.title}</h1>
              <p className="text-xs text-gray-400 line-clamp-2">{movie.overview}</p>
              <p className="text-xs mt-1">⭐ {movie.vote_average?.toFixed(1) || "N/A"}</p>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex justify-between p-2">
              {/* WATCHLIST */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  isWatchlisted(movie.id)
                    ? dispatch(removeFromWatchlistBackend(movie._id || movie.id))
                    : dispatch(addToWatchlistBackend(movie));
                }}
              >
                {isWatchlisted(movie.id) ? (
                  <FaBookmark className="text-yellow-400 h-5" />
                ) : (
                  <FaRegBookmark className="text-gray-400 h-5" />
                )}
              </button>

              {/* FAVOURITE */}
<button
  onClick={(e) => {
    e.stopPropagation();
    isFavourite(movie.id)
      ? dispatch(removeFromFavlistBackend(movie.id))
      : dispatch(addToFavlistBackend(movie));
  }}
>
  {isFavourite(movie.id) ? (
    <FaHeart className="text-red-500 h-5" />
  ) : (
    <FaRegHeart className="text-gray-400 h-5" />
  )}
</button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
