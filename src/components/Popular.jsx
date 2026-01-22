import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaRegHeart, FaHeart, FaRegBookmark, FaBookmark } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavlistBackend,
  removeFromFavlistBackend,
  addToWatchlistBackend,
  removeFromWatchlistBackend,
} from "../redux/MovieSlice";
import { toast } from "react-hot-toast";
import Popularmovies from "./utils/popularcard";

const genreMap = {
  Action: 28,
  Comedy: 35,
  Romance: 10749,
  Thriller: 53,
  Horror: 27,
};

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

export default function Popular() {
  const [popular, setPopular] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);

  const dispatch = useDispatch();
  const { favourite = [], watchlist = [] } = useSelector(
    (state) => state.movie || {}
  );

  const isWatchlisted = (movieId) =>
    watchlist.some((m) => m.movieId === movieId);
  const isFavourite = (movieId) =>
    favourite.some((m) => m.movieId === movieId);

  const handleWatchlistToggle = (movie) => {
    const movieInState = watchlist.find((m) => m.movieId === movie.id);
    if (movieInState) {
      dispatch(removeFromWatchlistBackend(movieInState.movieId));
      toast.error("Removed from watchlist");
    } else {
      dispatch(addToWatchlistBackend(movie));
      toast.success("Added to watchlist");
    }
  };

  const handleFavouriteToggle = (movie) => {
    const movieInState = favourite.find((m) => m.movieId === movie.id);
    if (movieInState) {
      dispatch(removeFromFavlistBackend(movieInState.movieId));
      toast.error("Removed from favourites");
    } else {
      dispatch(addToFavlistBackend(movie));
      toast.success("Added to favourites");
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        if (selectedGenre) {
          const genreId = genreMap[selectedGenre];
          const res = await fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`
          );
          const data = await res.json();
          setPopular(data.results);
        } else {
          // fallback to local mock popular movies
          const data = await Popularmovies();
          setPopular(data);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch movies");
      }
    };

    fetchMovies();
  }, [selectedGenre]);

  return (
    <div className="bg-black w-full px-6 py-5">
      <h1 className="text-white text-3xl font-bold mb-4">POPULAR</h1>

      {/* Genre filter */}
      <div className="flex gap-4 mb-6 overflow-x-auto scrollbar-hide scroll-smooth">
  {Object.keys(genreMap).map((genre) => (
    <button
      key={genre}
      className={`px-4 py-2 rounded-md font-semibold ${
        selectedGenre === genre
          ? "bg-yellow-400 text-black"
          : "bg-gray-800 text-white hover:bg-gray-700"
      }`}
      onClick={() => setSelectedGenre(genre)}
    >
      {genre}
    </button>
  ))}

  {selectedGenre && (
    <button
      className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
      onClick={() => setSelectedGenre(null)}
    >
      All genre
    </button>
  )}
</div>

      {/* Movies grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {popular.map((movie) => (
          <Link
            key={movie.id}
            to={`/movie/${movie.id}`}
            className="bg-[#111] rounded-xl overflow-hidden shadow-xl hover:scale-105 transition duration-300"
          >
            <img
              src={movie.poster_path || movie.poster}
              alt={movie.title}
              className="w-full h-48 object-cover"
            />

            <div className="p-2 text-white">
              <h2 className="font-semibold truncate">{movie.title}</h2>
              <p className="line-clamp-2 text-sm text-gray-300">
                {movie.overview}
              </p>
              <h3 className="text-sm font-semibold mt-1">
                ⭐ {movie.vote_average?.toFixed(1) || movie.rating || "N/A"}
              </h3>
            </div>

            {/* ICONS */}
            <div className="flex justify-between p-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleWatchlistToggle(movie);
                }}
              >
                {isWatchlisted(movie.id) ? (
                  <FaBookmark className="text-yellow-400 h-5" />
                ) : (
                  <FaRegBookmark className="text-gray-400 h-5" />
                )}
              </button>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleFavouriteToggle(movie);
                }}
              >
                {isFavourite(movie.id) ? (
                  <FaHeart className="text-red-500 h-5" />
                ) : (
                  <FaRegHeart className="text-gray-400 h-5" />
                )}
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
