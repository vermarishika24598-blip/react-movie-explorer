import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const API_KEY = "3b17db81e34acbea80c6104012518ad8";

export default function Header() {
  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  // Search movies using TMDB API
  useEffect(() => {
    // This correctly clears results if the search box is emptied
    if (!searchText.trim()) {
      setMovies([]);
      return;
    }

    setLoading(true);

    const delay = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchText}`
        );
        const data = await response.json();
        setMovies(data.results || []);
      } catch (error) {
        console.error("Search error:", error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [searchText]);

  const featureComingSoon = () => {
    toast("This feature will be available soon!");
  };

  // Function to clear search state when a movie link is clicked
  const handleMovieClick = () => {
    setSearchText(""); // Clears the input field
    setMovies([]); // Clears the search results grid
  };

  return (
    <div className="w-full bg-black text-white pb-6">
      <Toaster />

      {/* Header Navigation */}
      <div className="flex flex-col md:flex-row justify-between p-5 gap-4 md:gap-0">
        <nav className="flex items-center gap-5 font-bold text-xl">
          <Link
            to="/"
            className="bg-amber-500 rounded-lg px-4 py-2 text-black"
          >
            IMDB
          </Link>
          <Link to="/popular">Popular</Link>
          <Link to="/top-rated">Top Rated</Link>
          <Link to="/upcoming">Upcoming</Link>
        </nav>

        {/* Search Bar */}
        <input
          type="text"
          className="rounded-xl p-2 bg-white text-black w-full md:w-80"
          placeholder="Search your fav movie here 🎬"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <button
          type="button"
          className="mr-0"
          onClick={featureComingSoon}
        >
          Mode
        </button>
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center mt-4 bg-black">
          <div className="animate-spin border-4 border-gray-300 border-t-yellow-400 w-10 h-10 rounded-full"></div>
        </div>
      )}

      
      
      {!loading && searchText.trim() ? (
        movies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 mx-6 mt-4">
            {movies.map((movie) => (
              <Link 
                to={`/movie/${movie.id}`} 
                key={movie.id}
                onClick={handleMovieClick} 
              >
                <div className="bg-gray-800 p-3 rounded-lg hover:scale-105 transition">
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : "https://via.placeholder.com/300x450?text=No+Image"
                    }
                    alt={movie.title}
                    className="w-full h-60 object-cover rounded"
                  />
                  <h1 className="text-sm font-semibold mt-2 truncate">{movie.title}</h1>
                  <p className="line-clamp-2">{movie.overview}</p>
                  <h5 className="text-yellow-400 text-xs">
                    ⭐ {movie.rating}
                  </h5>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center mt-10 text-gray-400">
            No movies found for "{searchText}" 😔
          </p>
        )
      ) : (
        null // Show nothing when not loading and search text is empty (initial state)
      )}
    </div>
  );

}
