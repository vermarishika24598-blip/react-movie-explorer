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
  const [selectedGenre, setSelectedGenre] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { favourite = [], watchlist = [] } = useSelector(
    (state) => state.movie || {}
  );

  const genreMap = {
    Action: 28,
    Comedy: 35,
    Romance: 10749,
    Thriller: 53,
  };

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
    <div className="bg-gray-900 w-full px-4 py-5 min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 px-2 md:px-6">TOP RATED</h1>

      {/* Genre Filter */}
      <div className="flex gap-4 mb-6 overflow-x-auto scrollbar-hide scroll-smooth px-2 md:px-6 snap-x snap-mandatory">
        {Object.keys(genreMap).map((genre) => (
          <button
            key={genre}
            className={`px-4 py-2 rounded-md font-semibold snap-center transition-shadow duration-300 ${
              selectedGenre === genre
                ? "bg-yellow-400 text-black shadow-lg"
                : "bg-gray-800 text-white hover:bg-gray-700 shadow-sm"
            }`}
            onClick={() => setSelectedGenre(genre)}
          >
            {genre}
          </button>
        ))}

        {selectedGenre && (
          <button
            className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 shadow-md transition-colors duration-300"
            onClick={() => setSelectedGenre(null)}
          >
            All Genres
          </button>
        )}
      </div>

      {/* Movie Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 px-2 md:px-6">
        {topRated.length === 0 && (
          <p className="text-gray-400 text-center col-span-full py-10">
            No movies found 😔
          </p>
        )}

        {topRated.map((movie) => (
          <div
            key={movie.id}
            onClick={() => navigate(`/movie/${movie.id}`)}
            className="bg-gray-800 dark:bg-[#111] rounded-xl overflow-hidden shadow-xl hover:shadow-2xl hover:scale-105 transform transition-all duration-300 cursor-pointer"
          >
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "https://via.placeholder.com/500x750?text=No+Image"
              }
              alt={movie.title}
              className="w-full h-52 sm:h-60 md:h-72 object-cover transition-transform duration-300 hover:scale-110"
            />

            <div className="p-3 text-white">
              <h2 className="font-semibold text-sm md:text-base truncate">{movie.title}</h2>
              <p className="line-clamp-3 text-gray-300 text-xs md:text-sm mt-1">{movie.overview}</p>
              <h3 className="text-sm md:text-base font-semibold mt-2">
                ⭐ {movie.vote_average?.toFixed(1) || "N/A"}
              </h3>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between p-2 bg-gray-900">
              <button
                className="p-1 rounded-full hover:bg-gray-700 transition"
                onClick={(e) => {
                  e.stopPropagation();
                  handleWatchlistToggle(movie);
                }}
              >
                {isWatchlisted(movie.id) ? (
                  <FaBookmark className="text-yellow-400 h-5 w-5" />
                ) : (
                  <FaRegBookmark className="text-gray-400 h-5 w-5" />
                )}
              </button>

              <button
                className="p-1 rounded-full hover:bg-gray-700 transition"
                onClick={(e) => {
                  e.stopPropagation();
                  handleFavouriteToggle(movie);
                }}
              >
                {isFavourite(movie.id) ? (
                  <FaHeart className="text-red-500 h-5 w-5" />
                ) : (
                  <FaRegHeart className="text-gray-400 h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
