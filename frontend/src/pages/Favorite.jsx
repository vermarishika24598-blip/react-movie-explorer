import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "../components/MovieCard";
import { fetchFavlist } from "../redux/MovieSlice";

export default function Favorite() {
  const dispatch = useDispatch();

  const favourite = useSelector((state) => state.movies.favourite);
  const status = useSelector((state) => state.movies.status);

  useEffect(() => {
    dispatch(fetchFavlist());
  }, [dispatch]);

  // ✨ Premium Ambient Loading State
  if (status === "loading") {
    return (
      <div className="bg-neutral-950 min-h-screen text-neutral-400 flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
        <p className="text-sm font-medium tracking-wide animate-pulse">
          Loading your custom collection...
        </p>
      </div>
    );
  }

  // ✨ Beautiful Empty State (Agar list khali ho)
  if (!favourite || !favourite.length) {
    return (
      <div className="bg-neutral-950 min-h-screen text-neutral-400 flex flex-col items-center justify-center px-4 relative overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="text-6xl mb-4 text-neutral-600 animate-bounce">❤️</div>
        <h3 className="text-white text-xl font-bold mb-1">Your Favorites is Empty</h3>
        <p className="text-neutral-500 text-sm text-center max-w-xs">
          Tap the heart icon on any movie to curate your personal premium watchlist.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-neutral-950 min-h-screen px-6 py-10 text-neutral-200 relative overflow-hidden">
      {/* Background glow shadow effect */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="flex items-center space-x-3 mb-8 border-b border-neutral-900 pb-4">
          <span className="text-amber-500 text-2xl">❤️</span>
          <h1 className="text-white text-3xl font-black tracking-tight">
            Favorite Movies
          </h1>
          <span className="bg-neutral-900 border border-neutral-800 text-amber-400 text-xs font-bold px-2.5 py-1 rounded-full">
            {favourite.length} {favourite.length === 1 ? "Movie" : "Movies"}
          </span>
        </div>

        {/* Movies Grid Section */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {favourite.map((movie) => {
            const normalizedMovie = {
              id: movie.movieId,
              title: movie.title,
              poster_path: movie.poster,
            };

            return (
              <div 
                key={movie._id} 
                className="transition-transform duration-300 hover:scale-[1.03] hover:shadow-xl"
              >
                <MovieCard movie={normalizedMovie} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}