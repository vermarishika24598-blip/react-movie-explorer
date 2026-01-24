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

  if (status === "loading") {
    return (
      <div className="bg-white text-black text-center py-20 text-xl">
        ⏳ Loading your favorite list...
      </div>
    );
  }

  if (! favourite.length) {
    return (
      <div className="bg-white text-black text-center py-20 text-xl">
         Your Favouritelist  is empty
      </div>
    );
  }

  

  return (
    <div className="bg-black min-h-screen px-6 py-8">
      <h1 className="text-white text-2xl font-bold mb-6">
        Favorite Movies
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
       {favourite?.map((movie) => {
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

