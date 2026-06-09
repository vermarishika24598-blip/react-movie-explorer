import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AiFillHeart, AiOutlineClose, AiOutlineHeart } from "react-icons/ai";
import { BsBookmarkFill, BsBookmark } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { FiLogOut, FiSearch } from "react-icons/fi";

const API_KEY = "3b17db81e34acbea80c6104012518ad8";

function Header({ user, setUser }) {
  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const searchRef = useRef(null);

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

  // Search box ke bahar click karne par dropdown close karne ke liye
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchText("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isAuthenticated = Boolean(user);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <div className="w-full bg-neutral-900 border-b border-neutral-800 text-gray-200 pb-2 relative shadow-2xl z-50 backdrop-blur-md bg-opacity-95 sticky top-0">
      <Toaster position="bottom-right" reverseOrder={false} />

      {/* NAVBAR */}
      <div className="max-w-7xl mx-auto flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
        
        {/* LEFT NAV & BRAND LINKS */}
        <nav className="flex items-center gap-4 sm:gap-5 text-xs sm:text-sm md:text-base font-semibold overflow-x-auto scrollbar-hide py-1">
          {/* LOGO */}
          <Link
            to="/"
            className="bg-amber-500 text-black rounded-xl px-4 py-2 text-sm sm:text-base font-black tracking-wider shadow-lg shadow-amber-500/10 ring-2 ring-amber-400 hover:ring-amber-300 hover:bg-amber-400 transition-all duration-300 flex-shrink-0"
          >
            IMDb
          </Link>

          <Link to="/popular" className="hover:text-amber-400 transition-colors relative py-1 group">
            Popular
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-amber-400 transition-all duration-300 group-hover:w-full" />
          </Link>
          <Link to="/top-rated" className="hover:text-amber-400 transition-colors relative py-1 group">
            Top Rated
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-amber-400 transition-all duration-300 group-hover:w-full" />
          </Link>
          <Link to="/upcoming" className="hover:text-amber-400 transition-colors relative py-1 group">
            Upcoming
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-amber-400 transition-all duration-300 group-hover:w-full" />
          </Link>

          <div className="h-5 w-[1px] bg-neutral-800 mx-1 hidden sm:block" />

          {/* Premium Watchlist Icon Container */}
          <Link 
            to="/watchlist" 
            className="group flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-amber-500/40 hover:bg-neutral-900 shadow-md transition-all duration-300"
            title="Watchlist"
          >
            <div className="relative flex items-center justify-center">
              <BsBookmark className="text-neutral-400 text-lg group-hover:opacity-0 transition-opacity duration-200" />
              <BsBookmarkFill className="text-amber-500 text-lg absolute opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-110 group-hover:drop-shadow-[0_0_6px_rgba(245,158,11,0.5)] transition-all duration-300" />
            </div>
            <span className="text-xs font-medium text-neutral-400 group-hover:text-amber-400 transition-colors hidden lg:inline">Watchlist</span>
          </Link>

          {/* Premium Favourites Icon Container */}
          <Link 
            to="/favourites" 
            className="group flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-red-500/40 hover:bg-neutral-900 shadow-md transition-all duration-300"
            title="Favorites"
          >
            <div className="relative flex items-center justify-center">
              <AiOutlineHeart className="text-neutral-400 text-xl group-hover:opacity-0 transition-opacity duration-200" />
              <AiFillHeart className="text-red-500 text-xl absolute opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-110 group-hover:drop-shadow-[0_0_6px_rgba(239,68,68,0.5)] transition-all duration-300" />
            </div>
            <span className="text-xs font-medium text-neutral-400 group-hover:text-red-400 transition-colors hidden lg:inline">Favorites</span>
          </Link>
        </nav>

        {/* RIGHT CONTENT: SEARCH BAR & AUTH SETUP */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end relative" ref={searchRef}>
          
          {/* SEARCH INPUT WIDGET */}
          <div className="relative w-full md:w-80 group">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-amber-400 transition-colors" size={18} />
            <input
              type="text"
              className="w-full rounded-xl pl-10 pr-10 py-2 text-sm bg-neutral-950 text-gray-200 placeholder-neutral-500 border border-neutral-800 focus:border-amber-400/50 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all duration-300"
              placeholder="Search movies..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            {searchText && (
              <button 
                onClick={() => setSearchText("")} 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
              >
                <AiOutlineClose size={16} />
              </button>
            )}

            {/* FLOATING DROPDOWN SEARCH RESULTS */}
            {!loading && searchText && movies.length > 0 && (
              <div className="absolute right-0 top-full mt-2 w-full sm:w-[450px] max-h-[380px] bg-neutral-900/95 border border-neutral-800 rounded-2xl shadow-2xl overflow-y-auto z-[100] backdrop-blur-xl scrollbar-hide divide-y divide-neutral-800/60 custom-search-results">
                {movies.slice(0, 7).map((movie) => (
                  <Link
                    key={movie.id}
                    to={`/movie/${movie.id}`}
                    onClick={() => setSearchText("")}
                    className="flex items-center gap-4 p-3 hover:bg-neutral-800/60 transition-colors group"
                  >
                    <div className="w-12 h-16 rounded-lg overflow-hidden bg-neutral-950 flex-shrink-0 border border-neutral-800">
                      <img
                        src={
                          movie.poster_path
                            ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                            : "https://via.placeholder.com/200x300/171717/808080?text=No+Data"
                        }
                        alt={movie.title}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className="flex-grow min-w-0">
                      <h4 className="font-bold text-gray-200 text-sm group-hover:text-amber-400 transition-colors truncate">
                        {movie.title}
                      </h4>
                      <p className="text-xs text-neutral-400 line-clamp-1 mt-0.5">
                        {movie.release_date ? movie.release_date.split("-")[0] : "Year N/A"} • Movie
                      </p>
                      <p className="text-xs text-neutral-500 line-clamp-1 mt-0.5 italic">
                        {movie.overview || "No details available."}
                      </p>
                    </div>

                    <div className="flex-shrink-0 text-amber-400 text-xs font-mono font-bold bg-neutral-950/60 border border-neutral-800 px-2 py-1 rounded-md">
                      ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
                    </div>
                  </Link>
                ))}
                
                <div className="p-2.5 text-center bg-neutral-950/20">
                  <span className="text-xs font-medium text-amber-500 hover:text-amber-400 transition-colors cursor-pointer">
                    End of search results
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* AUTH LINKS */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {!isAuthenticated ? (
              <Link
                to="/login"
                className="flex items-center gap-2 px-4 py-2 text-sm rounded-xl font-medium border border-neutral-800 bg-neutral-950/40 hover:bg-neutral-800 hover:text-white transition-all duration-200"
              >
                Sign In
              </Link>
            ) : (
              <>
                <Link to="/profile" className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-neutral-800/40 hover:bg-neutral-800 border border-neutral-800 text-sm font-medium transition">
                  <FaUser className="text-amber-400 text-sm" />
                  <span className="hidden sm:inline max-w-[100px] truncate">{user?.name || "Profile"}</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="p-2.5 rounded-xl bg-red-950/30 border border-red-900/40 text-red-400 hover:bg-red-900 hover:text-white transition-all duration-200"
                  title="Logout"
                >
                  <FiLogOut size={16} />
                </button>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default React.memo(Header);