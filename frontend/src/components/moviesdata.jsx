import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaRegHeart, FaHeart, FaRegBookmark, FaBookmark, FaClock, FaCalendarAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavlistBackend,
  removeFromFavlistBackend,
  addToWatchlistBackend,
  removeFromWatchlistBackend,
} from "../redux/MovieSlice";

import { toast } from "react-hot-toast";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY || "3b17db81e34acbea80c6104012518ad8";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trailer, setTrailer] = useState(null);
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


        // Trailer Fetch
      const trailerRes = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`
      );

      const trailerData = await trailerRes.json();

      const officialTrailer = trailerData.results.find(
        (video) =>
          video.site === "YouTube" &&
          video.type === "Trailer"
      );

      setTrailer(officialTrailer || null);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchMovie();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-neutral-950">
        <div className="animate-spin border-4 border-neutral-800 border-t-amber-500 w-10 h-10 rounded-full" />
      </div>
    );

  if (!movie)
    return (
      <div className="flex justify-center items-center h-screen bg-neutral-950 text-neutral-400">
        <p className="text-lg">Movie not found 😔</p>
      </div>
    );

  // Check if movie is already in favourite / watchlist
  const isLiked = favourite.some((m) => m.id === movie.id);
  const isSaved = watchlist.some((m) => m.id === movie.id || m._id === movie.id);

  // Dispatch actions
  const handleWatchlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isSaved) {
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

    if (isLiked) {
      dispatch(removeFromFavlistBackend(movie));
      toast.error("Removed from Favorites!");
    } else {
      dispatch(addToFavlistBackend(movie));
      toast.success("Added to Favorites!");
    }
  };

  return (
    <div className="bg-neutral-950 text-neutral-200 min-h-screen w-full relative overflow-hidden">
      
      {/* BACKGROUND BACKDROP BANNER W/ GRADIENT OVERLAYS */}
      <div className="absolute top-0 left-0 w-full h-[60vh] md:h-[70vh] z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/20 via-neutral-950/80 to-neutral-950 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/50 to-transparent z-10" />
        {movie.backdrop_path && (
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt=""
            className="w-full h-full object-cover opacity-30 blur-[2px]"
          />
        )}
      </div>

      {/* MAIN CONTENT CONTAINER */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 md:gap-12 px-6 pt-24 pb-16 relative z-20">
        
        {/* POSTER IMAGE */}
        <div className="flex-shrink-0 mx-auto md:mx-0 w-64 aspect-[2/3] md:w-80 rounded-2xl overflow-hidden shadow-2xl border border-neutral-800 bg-neutral-900">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "https://via.placeholder.com/500x750/171717/808080?text=No+Poster"
            }
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* DETAILS COLUMN */}
        <div className="flex flex-col justify-center gap-5 w-full text-center md:text-left">
          
          {/* TITLE & TAGLINE */}
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white drop-shadow-md">
              {movie.title}
            </h1>
            {movie.tagline && (
              <p className="text-amber-400/80 italic text-sm md:text-base mt-1.5 font-medium">
                "{movie.tagline}"
              </p>
            )}
          </div>

          {/* QUICK STATS METADATA BAR */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs sm:text-sm font-medium text-neutral-400">
            <span className="flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 px-2.5 py-1 rounded-lg text-amber-400 font-mono font-bold">
              ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
            </span>
            
            {movie.release_date && (
              <span className="flex items-center gap-1.5 bg-neutral-900/50 border border-neutral-800/40 px-2.5 py-1 rounded-lg">
                <FaCalendarAlt className="text-neutral-500" size={13} />
                {movie.release_date.split("-")[0]}
              </span>
            )}

            {movie.runtime && (
              <span className="flex items-center gap-1.5 bg-neutral-900/50 border border-neutral-800/40 px-2.5 py-1 rounded-lg">
                <FaClock className="text-neutral-500" size={13} />
                {movie.runtime} mins
              </span>
            )}
          </div>

          {/* MOVIE GENRES BADGES */}
          {movie.genres && movie.genres.length > 0 && (
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              {movie.genres.map((genre) => (
                <span 
                  key={genre.id} 
                  className="text-xs font-semibold bg-neutral-900 border border-neutral-800 text-neutral-300 px-3 py-1 rounded-full shadow-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          )}

          {/* SYNOPSIS OVERVIEW */}
          <div className="space-y-2 max-w-2xl">
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-400">Synopsis</h2>
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-normal">
              {movie.overview || "No synopsis available for this title."}
            </p>
          </div>

          {/* ACTION BUTTONS (WATCHLIST & FAVORITES BAGDES) */}
          <div className="flex items-center justify-center md:justify-start gap-3 mt-4">
            
            {/* Watchlist Toggle */}
            <button 
              onClick={handleWatchlist}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-neutral-900 border border-neutral-800/80 hover:border-amber-500/40 hover:bg-neutral-800/60 transition-all duration-200 group shadow-lg"
            >
              {isSaved ? (
                <>
                  <FaBookmark className="text-amber-500" />
                  <span className="text-amber-500">In Watchlist</span>
                </>
              ) : (
                <>
                  <FaRegBookmark className="text-neutral-400 group-hover:text-amber-400 transition-colors" />
                  <span className="text-neutral-300 group-hover:text-white transition-colors">Add to Watchlist</span>
                </>
              )}
            </button>

            {/* Favorite Toggle */}
            <button 
              onClick={handleFavourite}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-neutral-900 border border-neutral-800/80 hover:border-red-500/40 hover:bg-neutral-800/60 transition-all duration-200 group shadow-lg"
            >
              {isLiked ? (
                <>
                  <FaHeart className="text-red-500" />
                  <span className="text-red-500">Favorited</span>
                </>
              ) : (
                <>
                  <FaRegHeart className="text-neutral-400 group-hover:text-red-500 transition-colors" />
                  <span className="text-neutral-300 group-hover:text-white transition-colors">Mark Favorite</span>
                </>
              )}
            </button>

            {trailer && (
  <a
    href={`https://www.youtube.com/watch?v=${trailer.key}`}
    target="_blank"
    rel="noreferrer"
    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-black hover:bg-gray-700 transition-all duration-200 shadow-lg text-white"
  >
    ▶ Watch Trailer
  </a>
)}

          </div>

        </div>
      </div>
    </div>
  );
}