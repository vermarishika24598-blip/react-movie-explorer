import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavlistBackend,
  removeFromFavlistBackend,
  addToWatchlistBackend,
  removeFromWatchlistBackend
} from "../redux/MovieSlice";


import {
  FaHeart,
  FaRegHeart,
  FaBookmark,
  FaRegBookmark,
} from "react-icons/fa";

export default function MovieCard({ movie }) {
  const dispatch = useDispatch();

  const { favourite = [], watchlist = [] } = useSelector(
    (state) => state.movies
  );

  const isFavourite = favourite.some((m) => m.id === movie.id);
  const isWatchlisted = watchlist.some((m) => m.id === movie.id);

  return (
    <div className="bg-[#111] rounded-xl overflow-hidden shadow-lg hover:scale-105 transition duration-300">
      {/* CLICKABLE AREA */}
      <Link to={`/movie/${movie.id}`}>
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "https://via.placeholder.com/300x450?text=No+Image"
          }
          alt={movie.title}
          className="w-full h-48 object-cover"
        />

        <div className="p-2 text-white">
          <h2 className="font-semibold text-sm truncate">{movie.title}</h2>

          <p className="text-xs text-gray-400 line-clamp-2">
            {movie.overview}
          </p>

          <p className="text-xs mt-1 text-yellow-400">
            ⭐ {movie.vote_average?.toFixed(1) || "N/A"}
          </p>
        </div>
      </Link>

      {/* ACTION BUTTONS */}
      <div className="flex justify-between px-3 pb-3">
      {/* WATCHLIST */}
<button
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();

    isWatchlisted
      ? dispatch(removeFromWatchlistBackend(movie))
      : dispatch(addToWatchlistBackend(movie));
  }}
>
  {isWatchlisted ? (
    <FaBookmark className="text-yellow-400 text-lg" />
  ) : (
    <FaRegBookmark className="text-gray-400 hover:text-yellow-400 text-lg" />
  )}
</button>

{/* FAVOURITE */}
<button
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();

    isFavourite
      ? dispatch(removeFromFavlistBackend(movie))
      : dispatch(addToFavlistBackend(movie));
  }}
>
  {isFavourite ? (
    <FaHeart className="text-red-500 text-lg" />
  ) : (
    <FaRegHeart className="text-gray-400 hover:text-red-500 text-lg" />
  )}
</button>
 </div>
    </div>
  );
}
