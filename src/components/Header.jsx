import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";
import { AiFillHeart } from "react-icons/ai";
import { BsBookmarkFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

const API_KEY = "3b17db81e34acbea80c6104012518ad8";

function Header() {
  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { profile, token } = useSelector((state) => state.user);
  const isAuthenticated = Boolean(token);

  const { favourite = [], watchlist = [] } = useSelector(
    (state) => state.movie || {}
  );

  useEffect(() => {
    if (!searchText.trim()) {
      setMovies([]);
      return;
    }

    setLoading(true);
    const delay = setTimeout(async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchText}`
      );
      const data = await res.json();
      setMovies(data.results || []);
      setLoading(false);
    }, 500);

    return () => clearTimeout(delay);
  }, [searchText]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    // optionally reset Redux user state here
    window.location.reload(); // or navigate to login/home
  };

  return (
    <div className="w-full bg-black text-white pb-4">
      <Toaster />

      {/* NAVBAR */}
      <div className="flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between">
        {/* LEFT NAV */}
        <nav className="flex items-center flex-nowrap gap-2 sm:gap-4 text-xs sm:text-sm md:text-lg font-semibold overflow-x-auto">
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
              <Link to="/profile" className="flex items-center gap-1">
                <FaUser className="text-xl" />
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

      {/* SEARCH RESULTS */}
      {!loading && searchText && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 px-4">
          {movies.map((movie) => (
            <Link key={movie.id} to={`/movie/${movie.id}`}>
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
                <p className="mt-1 text-sm truncate">{movie.title}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default React.memo(Header);
