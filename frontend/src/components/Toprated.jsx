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

const API_KEY = process.env.REACT_APP_TMDB_API_KEY || "3b17db81e34acbea80c6104012518ad8";

export default function Top() {
  const [topRated, setTopRated] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null); // Genre filter
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux split handling fallback
  const { favourite = [], watchlist = [] } = useSelector(
    (state) => state.movies || state.movie || {}
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
          url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&sort_by=vote_average.desc&vote_count.gte=300`;
        } else {
          url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`;
        }

        const res = await fetch(url);
        const data = await res.json();
        setTopRated(data.results || []);
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
      toast.error("Removed from favorites");
    } else {
      dispatch(addToFavlistBackend(movie));
      toast.success("Added to favorites");
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
    <div className="bg-neutral-950 min-h-screen w-full px-4 sm:px-8 py-8 text-neutral-200">
      
      {/* GENRE FILTER CHIPS BAR */}
      <div className="max-w-7xl mx-auto flex items-center gap-3 mb-8 overflow-x-auto scrollbar-hide py-2 px-1">
        
        {/* Reset / All Top Rated Button */}
        <button
          className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 flex-shrink-0 border ${
            selectedGenre === null
              ? "bg-amber-500 text-black border-amber-400 shadow-lg shadow-amber-500/10"
              : "bg-neutral-900 text-neutral-400 border-neutral-800/80 hover:text-white hover:bg-neutral-800"
          }`}
          onClick={() => setSelectedGenre(null)}
        >
          🏆 All Top Rated
        </button>

        {/* Dynamic Genre List mapping */}
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

      {/* TOP RATED STREAM GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {topRated.map((movie) => {
          const movieRating = movie.vote_average || 0;
          const posterUrl = movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://via.placeholder.com/500x750/171717/808080?text=No+Poster";

          return (
            <div
              key={movie.id}
              onClick={() => navigate(`/movie/${movie.id}`)}
              className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:border-amber-500/30 hover:-translate-y-1.5 flex flex-col h-full group relative cursor-pointer"
            >
              {/* Poster Box with Proportional Aspect Constraint */}
              <div className="relative aspect-[2/3] w-full overflow-hidden bg-neutral-950">
                <img
                  src={posterUrl}
                  alt={movie.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Floating Amber Rating Badge */}
                <div className="absolute top-2 right-2 bg-neutral-950/80 backdrop-blur-md text-amber-400 font-mono text-xs font-bold px-2.5 py-1 rounded-lg border border-neutral-800 shadow-md">
                  ⭐ {movieRating.toFixed(1)}
                </div>
              </div>

              {/* Text Context Wrap */}
              <div className="p-3.5 flex flex-col flex-grow justify-between text-neutral-200">
                <div>
                  <h2 className="font-bold text-sm sm:text-base group-hover:text-amber-400 transition-colors line-clamp-1 mb-1">
                    {movie.title}
                  </h2>
                  <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed font-normal">
                    {movie.overview || "No data synopsis registered."}
                  </p>
                </div>
              </div>

              {/* ACTION CONTROL FOOTER BAR */}
              <div className="flex justify-between items-center px-4 pb-3.5 pt-1 bg-neutral-900">
                
                {/* Watchlist Action */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
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

                {/* Favorite Action */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
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