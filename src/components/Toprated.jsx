import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavlistBackend,
  removeFromFavlistBackend,
  addToWatchlistBackend,
  removeFromWatchlistBackend,
} from "../redux/MovieSlice";
import Topratedmovies from "./utils/Topratedmoviesdata";
import {
  FaHeart,
  FaRegHeart,
  FaBookmark,
  FaRegBookmark,
} from "react-icons/fa";

export default function Top() {
  const [topRated, setTopRated] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { favourite = [], watchlist = [] } = useSelector(
    (state) => state.movie || {}
  );

  useEffect(() => {
    Topratedmovies().then(setTopRated);
  }, []);

  const isFavourite = (id) => favourite.some((movie) => movie._id === id || movie.id === id);
  const isWatchlisted = (id) =>
    watchlist.some((movie) => movie._id === id || movie.id === id);

  return (
    <div className="bg-black w-full px-4 pt-5">
      <h1 className="text-white text-3xl font-bold p-5">TOP RATED</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 px-6">
        {topRated.map((movie) => (
          <div
            key={movie.id}
            onClick={() => navigate(`/movie/${movie.id}`)}
            className="bg-[#111] rounded-xl overflow-hidden shadow-xl hover:scale-105 transition duration-300 cursor-pointer"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-48 object-cover"
            />

            <div className="p-2 text-white">
              <h2 className="font-semibold truncate">{movie.title}</h2>
              <p className="line-clamp-2 text-sm text-gray-300">{movie.overview}</p>
              <h3 className="text-sm font-semibold mt-1">
                ⭐ {movie.vote_average?.toFixed(1) || "N/A"}
              </h3>
            </div>

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
                    ? dispatch(removeFromFavlistBackend(movie))
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
