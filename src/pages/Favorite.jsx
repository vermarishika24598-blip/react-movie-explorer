
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import MovieCard from "../components/MovieCard";
import { fetchFavlist } from "../redux/movieSlice";

export default function Favourites() {
  const dispatch = useDispatch();

  const favourite = useSelector((state) => state.movies?.favourite ?? []);
  const status = useSelector((state) => state.movies?.status ?? "idle");

  useEffect(() => {
    dispatch(fetchFavlist());
  }, [dispatch]);

  if (status === "loading") {
    return (
      <div className="bg-black text-white text-center py-20 text-xl">
        ⏳ Loading your favourites...
      </div>
    );
  }

  if (!favourite.length) {
    return (
      <div className="bg-black text-white text-center py-20 text-xl">
        ❤️ No favourite movies yet
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen px-6 py-8">
      <h1 className="text-white text-2xl font-bold mb-6">
        ❤️ Favourite Movies
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {favourite.map((movie) => {
          const normalizedMovie = {
            id: movie.movieId,
            title: movie.title,
            poster_path: movie.poster,
          };

          return <MovieCard key={movie._id || movie.movieId} movie={normalizedMovie} />;
        })}
      </div>
    </div>
  );
}

