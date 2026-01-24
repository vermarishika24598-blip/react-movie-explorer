const API_KEY=process.env.REACT_APP_TMDB_API_KEY
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaRegHeart, FaHeart, FaRegBookmark, FaBookmark } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavlistBackend,
  removeFromFavlistBackend,
  addToWatchlistBackend,
  removeFromWatchlistBackend,
} from "../redux/MovieSlice";

import { toast } from "react-hot-toast";





export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { favourite = [], watchlist = [] } = useSelector(
    (state) => state.movies || {}
  );

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
        );
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchMovie();
  }, [id]);

  if (loading)
    return <p className="text-white text-center py-20">Loading...</p>;
  if (!movie)
    return (
      <p className="text-white text-center py-20">
        Movie not found 😔
      </p>
    );

  // Check if movie is already in favourite / watchlist
  const isLiked = favourite.some((m) => m.id === movie.id || m.id ===movie.id);
  const isSaved = watchlist.some((m) => m._id === movie.id || m.id === movie.id);

  // Dispatch correct actions
  const handleWatchlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isSaved) {
      dispatch(removeFromWatchlistBackend(movie));
      toast.error("Removed from Watchlist!"); // ✅ removed toast
    } else {
      dispatch(addToWatchlistBackend(movie));
      toast.success("Added to Watchlist!"); // ✅ added toast
    }
  };
  const handleFavourite = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isLiked) {
      dispatch(removeFromFavlistBackend(movie));
      toast.error("Removed from Favorites!"); // ✅ removed toast
    } else {
      dispatch(addToFavlistBackend(movie));
      toast.success("Added to Favorites!"); // ✅ added toast
    }
  };
  

  return (
    <div className="bg-white text-black  w-full py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10">
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "https://via.placeholder.com/500x750?text=No+Image"
          }
          alt={movie.title}
          className="w-60 h-[360px] md:w-72 md:h-[450px] object-cover rounded-xl shadow-lg"
        />
        <div className="flex flex-col gap-4 w-full">
          <h1 className="text-2xl md:text-4xl font-extrabold">{movie.title}</h1>
          <h3 className="text-lg font-semibold text-yellow-400">
            ⭐ {movie.vote_average?.toFixed(1) || "N/A"}
          </h3>
          <div className="space-y-1 text-gray-300">
            {movie.release_date && (
              <p>
                <span className="font-bold text-white">Release:</span>{" "}
                {movie.release_date}
              </p>
            )}
            {movie.runtime && (
              <p>
                <span className="font-bold text-black">Runtime:</span>{" "}
                {movie.runtime} mins
              </p>
            )}
          </div>
          <p className="text-black leading-relaxed mt-3">{movie.overview}</p>
          <div className="flex gap-4 mt-4 text-xl sm:text-3xl">
            <button onClick={handleWatchlist}>
              {isSaved ? (
                <FaBookmark className="text-yellow-400" />
              ) : (
                <FaRegBookmark className="text-gray-400 hover:text-yellow-400" />
              )}
            </button>
            <button onClick={handleFavourite}>
              {isLiked ? (
                <FaHeart className="text-red-500" />
              ) : (
                <FaRegHeart className="text-gray-400 hover:text-red-500" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
