import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AiFillHeart } from "react-icons/ai";
import { BsBookmarkFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

const API_KEY = "3b17db81e34acbea80c6104012518ad8";

function Header({ user, setUser }) {
  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch movies for search
  useEffect(() => {
    if (!searchText.trim()) {
      setMovies([]);
      return;
    }

    setLoading(true);
    const delay = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchText}`
        );
        const data = await res.json();
        setMovies(data.results || []);
      } catch (err) {
        console.error("Search failed:", err);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [searchText]);

  const isAuthenticated = Boolean(user);

  const handleLogout = () => {
    localStorage.removeItem("token"); // remove token
    setUser(null); // update App state immediately
  };

  return (
    <div className="w-full bg-black text-white pb-4 relative">
      <Toaster />

      {/* NAVBAR */}
      <div className="flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between">
        {/* LEFT NAV */}
        <nav className="flex items-center flex-nowrap gap-2 sm:gap-4 text-xs sm:text-sm md:text-lg font-semibold overflow-x-auto scrollbar-hide">
          {/* LOGO */}
          <Link
            to="/"
            className="bg-amber-500 text-black rounded-md px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-base"
          >
            IMDB
          </Link>

          <Link to="/popular">Popular</Link>
          <Link to="/top-rated">Top Rated</Link>
          <Link to="/upcoming">Upcoming</Link>

          {/* AUTH LINKS */}
          {!isAuthenticated ? (
            <Link
              to="/login"
              className="flex items-center gap-1 px-2 py-1 rounded"
            >
              Sign In
            </Link>
          ) : (
            <>
              {/* Profile */}
              <Link to="/profile" className="flex items-center gap-2">
                <FaUser className="text-xl" />
                <span className="hidden sm:inline">{user?.name}</span>
              </Link>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="p-2 rounded-full hover:bg-gray-700 transition"
                title="Logout"
              >
                <FiLogOut className="text-white w-6 h-6" />
              </button>
            </>
          )}

          {/* Watchlist */}
          <Link to="/watchlist" className="flex items-center gap-1">
            <BsBookmarkFill className="text-yellow-400 text-xl" />
          </Link>

          {/* Favourites */}
          <Link to="/favourites" className="flex items-center gap-1">
            <AiFillHeart className="text-red-500 text-xl" />
          </Link>
        </nav>

        {/* SEARCH */}
        <input
          type="text"
          className="w-full md:w-80 rounded-lg p-2 text-sm text-black"
          placeholder="Search movies 🎬"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      {/* FULL SCREEN SEARCH RESULTS */}
      {!loading && searchText && movies.length > 0 && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-95 overflow-y-auto scrollbar-hide p-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {movies.map((movie) => (
              <Link
                key={movie.id}
                to={`/movie/${movie.id}`}
                onClick={() => setSearchText("")} // clear search results
              >
                <div className="bg-gray-800 p-2 rounded hover:scale-105 transition">
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : "https://via.placeholder.com/300x450"
                    }
                    alt={movie.title}
                    className="h-48 w-full object-cover rounded"
                  />
                  <div className="p-2 text-white">
                    <h2 className="font-semibold truncate">{movie.title}</h2>
                    <p className="line-clamp-2 text-sm text-gray-300">
                      {movie.overview || "No description"}
                    </p>
                    <h3 className="text-sm font-semibold mt-1">
                      ⭐ {movie.vote_average?.toFixed(1) || "N/A"}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default React.memo(Header);
