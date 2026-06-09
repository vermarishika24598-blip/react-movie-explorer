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

const API_KEY = process.env.REACT_APP_TMDB_API_KEY || "3b17db81e34acbea80c6104012518ad8";

export default function Popular() {
  const [popular, setPopular] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);

  const dispatch = useDispatch();
  // Safe mapping for state.movies or state.movie fallback
  const { favourite = [], watchlist = [] } = useSelector(
    (state) => state.movies || state.movie || {}
  );

  const isWatchlisted = (movieId) =>
    watchlist.some((m) => m.id === movieId || m.movieId === movieId);
  const isFavourite = (movieId) =>
    favourite.some((m) => m.id === movieId || m.movieId === movieId);

  const handleWatchlistToggle = (movie) => {
    const movieInState = watchlist.find((m) => m.id === movie.id || m.movieId === movie.id);
    if (movieInState) {
      dispatch(removeFromWatchlistBackend(movieInState.id || movieInState.movieId));
      toast.error("Removed from watchlist");
    } else {
      dispatch(addToWatchlistBackend(movie));
      toast.success("Added to watchlist");
    }
  };

  const handleFavouriteToggle = (movie) => {
    const movieInState = favourite.find((m) => m.id === movie.id || m.movieId === movie.id);
    if (movieInState) {
      dispatch(removeFromFavlistBackend(movieInState.id || movieInState.movieId));
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
          setPopular(data.results || []);
        } else {
          const data = await Popularmovies();
          setPopular(data || []);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch movies");
      }
    };

    fetchMovies();
  }, [selectedGenre]);

  return (
    <div className="bg-neutral-950 min-h-screen w-full px-4 sm:px-8 py-8 text-neutral-200">
      
      {/* GENRE FILTER TABS BAR */}
      <div className="max-w-7xl mx-auto flex items-center gap-3 mb-8 overflow-x-auto scrollbar-hide py-2 px-1">
        
        {/* All Genre / Reset Button */}
        <button
          className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 flex-shrink-0 border ${
            selectedGenre === null
              ? "bg-amber-500 text-black border-amber-400 shadow-lg shadow-amber-500/10"
              : "bg-neutral-900 text-neutral-400 border-neutral-800/80 hover:text-white hover:bg-neutral-800"
          }`}
          onClick={() => setSelectedGenre(null)}
        >
          ✨ All Movies
        </button>

        {/* Dynamic Genre Chips */}
        {Object.keys(genreMap).map((genre) => (
          <button
            key={genre}
            className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 flex-shrink-0 border ${
              selectedGenre === genre
                ? "bg-amber-500 text-black border-amber-400 shadow-lg shadow-amber-500/10"
                : "bg-neutral-900 text-neutral-400 border-neutral-800/80 hover:text-white hover:bg-neutral-800"
            }`}
            onClick={() => setSelectedGenre(genre)}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* MOVIES STREAM GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {popular.map((movie) => {
          const rating = movie.vote_average ?? movie.rating ?? 0;
          const posterPath = movie.poster_path 
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
            : movie.poster || "https://via.placeholder.com/500x750/171717/808080?text=No+Poster";

          return (
            <div 
              key={movie.id}
              className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:border-amber-500/30 hover:-translate-y-1.5 flex flex-col h-full group relative"
            >
              {/* CLICKABLE COVER AREA */}
              <Link to={`/movie/${movie.id}`} className="flex flex-col flex-grow">
                
                {/* Poster Box with Portrait Constraint */}
                <div className="relative aspect-[2/3] w-full overflow-hidden bg-neutral-950">
                  <img
                    src={posterPath}
                    alt={movie.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  {/* Floating Rating Badge */}
                  <div className="absolute top-2 right-2 bg-neutral-950/80 backdrop-blur-md text-amber-400 font-mono text-xs font-bold px-2.5 py-1 rounded-lg border border-neutral-800 shadow-md">
                    ⭐ {typeof rating === 'number' ? rating.toFixed(1) : rating}
                  </div>
                </div>

                {/* Text Context Wrap */}
                <div className="p-3.5 flex flex-col flex-grow justify-between text-neutral-200">
                  <div>
                    <h2 className="font-bold text-sm sm:text-base group-hover:text-amber-400 transition-colors line-clamp-1 mb-1">
                      {movie.title}
                    </h2>
                    <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed font-normal">
                      {movie.overview || "No details available."}
                    </p>
                  </div>
                </div>
              </Link>

              {/* FLOATING ACTION CONTROL BAR */}
              <div className="flex justify-between items-center px-4 pb-3.5 pt-1 bg-neutral-900">
                
                {/* Watchlist Toggle */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleWatchlistToggle(movie);
                  }}
                  className="flex items-center justify-center p-2 rounded-xl bg-neutral-950 border border-neutral-800/80 hover:border-amber-500/40 hover:bg-neutral-800 transition-all duration-200"
                  title="Watchlist"
                >
                  {isWatchlisted(movie.id) ? (
                    <FaBookmark className="text-amber-500 text-sm" />
                  ) : (
                    <FaRegBookmark className="text-neutral-500 hover:text-amber-400 text-sm transition-colors" />
                  )}
                </button>

                {/* Favorite Toggle */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleFavouriteToggle(movie);
                  }}
                  className="flex items-center justify-center p-2 rounded-xl bg-neutral-950 border border-neutral-800/80 hover:border-red-500/40 hover:bg-neutral-800 transition-all duration-200"
                  title="Favorite"
                >
                  {isFavourite(movie.id) ? (
                    <FaHeart className="text-red-500 text-sm" />
                  ) : (
                    <FaRegHeart className="text-neutral-500 hover:text-red-500 text-sm transition-colors" />
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}