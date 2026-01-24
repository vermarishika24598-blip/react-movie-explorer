import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavlistBackend,
  removeFromFavlistBackend,
  addToWatchlistBackend,
  removeFromWatchlistBackend,
} from "../redux/MovieSlice";
import { FaHeart, FaRegHeart, FaBookmark, FaRegBookmark } from "react-icons/fa";
import { toast } from "react-hot-toast";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

export default function Top() {
  const [topRated, setTopRated] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null); // Genre filter
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { favourite = [], watchlist = [] } = useSelector(
    (state) => state.movie || {}
  );

  // Genre mapping to TMDB IDs
  const genreMap = {
    Action: 28,
    Comedy: 35,
    Romance: 10749,
    Thriller: 53,
  };

  // Fetch movies on genre change
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let url = "";

        if (selectedGenre) {
          const genreId = genreMap[selectedGenre];
          url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`;
        } else {
          url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`;
        }

        const res = await fetch(url);
        const data = await res.json();
        setTopRated(data.results);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch movies");
      }
    };

    fetchMovies();
  }, [selectedGenre]);

  const isFavourite = (id) => favourite.some((movie) => movie._id === id || movie.id === id);
  const isWatchlisted = (id) => watchlist.some((movie) => movie._id === id || movie.id === id);

  const handleFavouriteToggle = (movie) => {
    if (isFavourite(movie.id)) {
      dispatch(removeFromFavlistBackend(movie._id || movie.id));
      toast.error("Removed from favourites");
    } else {
      dispatch(addToFavlistBackend(movie));
      toast.success("Added to favourites");
    }
  };

  const handleWatchlistToggle = (movie) => {
    if (isWatchlisted(movie.id)) {
      dispatch(removeFromWatchlistBackend(movie._id || movie.id));
      toast.error("Removed from watchlist");
    } else {
      dispatch(addToWatchlistBackend(movie));
      toast.success("Added to watchlist");
    }
  };

  return (
    <div className="w-full px-4 pt-4 bg-black min-h-screen">
      {/* Genre Filter Buttons */}
      <div className="flex gap-4 mb-6 overflow-x-auto scrollbar-hide scroll-smooth bg-gray-100 dark:bg-gray-900 p-2 rounded-md">
        {Object.keys(genreMap).map((genre) => (
          <button
            key={genre}
            className={`px-4 py-2 rounded-md font-semibold transition ${
              selectedGenre === genre
                ? "bg-yellow-400 text-black"
                : "bg-gray-300 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-700"
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
            All Genres
          </button>
        )}
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {topRated.map((movie) => (
          <div
            key={movie.id}
            onClick={() => navigate(`/movie/${movie.id}`)}
            className="bg-gray-100 dark:bg-[#111] rounded-xl overflow-hidden shadow-lg hover:scale-105 transition duration-300 cursor-pointer"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-48 object-cover"
            />

            <div className="p-2">
              <h1 className="text-sm font-semibold truncate text-gray-900 dark:text-white">
                {movie.title}
              </h1>
              <p className="text-xs text-gray-700 dark:text-gray-400 line-clamp-2">
                {movie.overview}
              </p>
              <p className="text-xs mt-1 text-gray-900 dark:text-white">
                ⭐ {movie.vote_average?.toFixed(1) || "N/A"}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between p-2">
              {/* Watchlist */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleWatchlistToggle(movie);
                }}
              >
                {isWatchlisted(movie.id) ? (
                  <FaBookmark className="text-yellow-400 h-5" />
                ) : (
                  <FaRegBookmark className="text-gray-400 dark:text-gray-300 h-5" />
                )}
              </button>

              {/* Favourite */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleFavouriteToggle(movie);
                }}
              >
                {isFavourite(movie.id) ? (
                  <FaHeart className="text-red-500 h-5" />
                ) : (
                  <FaRegHeart className="text-gray-400 dark:text-gray-300 h-5" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
      );
}  
