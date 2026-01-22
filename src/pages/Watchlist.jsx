import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "../components/MovieCard";
import { fetchWatchlist } from "../redux/MovieSlice";

export default function Watchlist() {
  const dispatch = useDispatch();

  const watchlist = useSelector((state) => state.movies.watchlist);
  const status = useSelector((state) => state.movies.status);

  useEffect(() => {
    dispatch(fetchWatchlist());
  }, [dispatch]);

  if (status === "loading") {
    return (
      <div className="bg-black text-white text-center py-20 text-xl">
        ⏳ Loading your watchlist...
      </div>
    );
  }

  if (!watchlist.length) {
    return (
      <div className="bg-black text-white text-center py-20 text-xl">
        📌 Your watchlist is empty
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen px-6 py-8">
      <h1 className="text-white text-2xl font-bold mb-6">
        📌 Watchlist Movies
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {watchlist.map((movie) => {
          const normalizedMovie = {
            id: movie.movieId,
            title: movie.title,
            poster_path: movie.poster,
          };

          return <MovieCard key={movie._id} movie={normalizedMovie} />;
        })}
      </div>
    </div>
  );
}

