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

import toast from "react-hot-toast";

export default function MovieCard({ movie }) {
  const dispatch = useDispatch();

  const { favourite = [], watchlist = [] } = useSelector(
    (state) => state.movies
  );

  // Fallback mechanisms taaki agar data normal results se aaye ya mapper se, crash na ho
  const movieId = movie.id;
  const movieTitle = movie.title || movie.name || "Untitled";
  const movieOverview = movie.overview || "No synopsis details provided.";
  const movieRating = movie.vote_average ?? movie.rating ?? 0;
  
  // Poster check jo direct formatted links aur raw TMDB paths dono handle karega
  const moviePoster = movie.poster 
    ? movie.poster 
    : movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "https://via.placeholder.com/500x750/171717/808080?text=No+Poster";

  const isFavourite = favourite.some((m) => m.id === movieId);
  const isWatchlisted = watchlist.some((m) => m.id === movieId);

  const handleWatchlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isWatchlisted) {
      dispatch(removeFromWatchlistBackend(movie));
      toast.error("Removed from Watchlist!");
    } else {
      dispatch(addToWatchlistBackend(movie));
      toast.success("Added to Watchlist!");
    }
  };

  const handleFavourite = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isFavourite) {
      dispatch(removeFromFavlistBackend(movie));
      toast.error("Removed from Favorites!");
    } else {
      dispatch(addToFavlistBackend(movie));
      toast.success("Added to Favorites!");
    }
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:border-amber-500/30 hover:-translate-y-1.5 flex flex-col h-full group">
      
      {/* CLICKABLE AREA */}
      <Link to={`/movie/${movieId}`} className="flex flex-col flex-grow">
        
        {/* Poster Wrapper with Aspect Ratio for Portrait Layout */}
        <div className="relative aspect-[2/3] w-full overflow-hidden bg-neutral-950">
          <img
            src={moviePoster}
            alt={movieTitle}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          
          {/* Top Rating Badge */}
          <div className="absolute top-2 right-2 bg-neutral-950/80 backdrop-blur-md text-amber-400 font-mono text-xs font-bold px-2.5 py-1 rounded-lg border border-neutral-800 shadow-lg">
            ⭐ {typeof movieRating === 'number' ? movieRating.toFixed(1) : movieRating}
          </div>
        </div>

        {/* Content Area */}
        <div className="p-4 flex flex-col flex-grow justify-between text-neutral-200">
          <div>
            <h2 className="font-bold text-sm md:text-base group-hover:text-amber-400 transition-colors line-clamp-1 mb-1">
              {movieTitle}
            </h2>
            <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
              {movieOverview}
            </p>
          </div>
        </div>
      </Link>

      {/* ACTION BUTTONS */}
      <div className="flex justify-between items-center px-4 pb-4 pt-1 bg-neutral-900">
        
        {/* WATCHLIST BUTTON */}
        <button 
          onClick={handleWatchlist}
          className="flex items-center justify-center p-2 rounded-xl bg-neutral-950 border border-neutral-800/80 hover:border-amber-500/40 hover:bg-neutral-800 transition-all duration-200"
          title={isWatchlisted ? "Remove from Watchlist" : "Add to Watchlist"}
        >
          {isWatchlisted ? (
            <FaBookmark className="text-amber-500 text-sm" />
          ) : (
            <FaRegBookmark className="text-neutral-500 group-hover:text-amber-400 text-sm transition-colors" />
          )}
        </button>

        {/* FAVOURITE BUTTON */}
        <button 
          onClick={handleFavourite}
          className="flex items-center justify-center p-2 rounded-xl bg-neutral-950 border border-neutral-800/80 hover:border-red-500/40 hover:bg-neutral-800 transition-all duration-200"
          title={isFavourite ? "Remove from Favorites" : "Add to Favorites"}
        >
          {isFavourite ? (
            <FaHeart className="text-red-500 text-sm" />
          ) : (
            <FaRegHeart className="text-neutral-500 group-hover:text-red-500 text-sm transition-colors" />
          )}
        </button>

      </div>
    </div>
  );
}