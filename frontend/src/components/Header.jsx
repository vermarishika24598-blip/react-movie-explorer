import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AiOutlineClose, AiFillStar } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { FiLogOut, FiSearch } from "react-icons/fi";

const API_KEY = "3b17db81e34acbea80c6104012518ad8";

function Header({ user, setUser }) {
  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    if (!searchText.trim()) {
      setMovies([]);
      return;
    }
    setLoading(true);
    const delay = setTimeout(async () => {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchText}`);
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
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <div className="w-full bg-neutral-900 border-b border-neutral-800 text-gray-200 sticky top-0 z-[100] shadow-2xl">
      <Toaster position="bottom-right" />

      <div className="max-w-7xl mx-auto p-3 flex flex-col gap-3">
        {/* Row 1: Logo, Search, Auth */}
        <div className="flex items-center justify-between gap-3">
          <Link to="/" className="bg-amber-500 text-black px-4 py-1.5 rounded-lg font-black text-sm tracking-tight hover:bg-amber-400 transition-all">
            IMDb
          </Link>

          {/* Search Bar with Premium Dropdown */}
          <div className="flex-1 relative max-w-sm" ref={searchRef}>
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={16} />
            <input
              type="text"
              className="w-full rounded-xl pl-9 pr-8 py-2 text-xs bg-neutral-950 border border-neutral-800 focus:border-amber-500 outline-none transition-all"
              placeholder="Search movies..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            {searchText && (
              <button onClick={() => setSearchText("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white">
                <AiOutlineClose size={14} />
              </button>
            )}

            {/* Premium Search Results */}
            {!loading && searchText && movies.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-3 max-h-[450px] bg-neutral-900/95 backdrop-blur-2xl border border-neutral-700/50 rounded-2xl shadow-2xl z-[100] overflow-hidden flex flex-col">
                <div className="overflow-y-auto custom-scrollbar">
                  {movies.slice(0, 6).map((movie) => (
                    <Link
                      key={movie.id}
                      to={`/movie/${movie.id}`}
                      onClick={() => setSearchText("")}
                      className="flex items-center gap-4 p-3 hover:bg-neutral-800/50 transition-all group border-b border-neutral-800/50"
                    >
                      <div className="w-12 h-16 rounded-lg overflow-hidden flex-shrink-0 shadow-lg ring-1 ring-white/10">
                        <img
                          src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : "https://via.placeholder.com/200x300"}
                          alt={movie.title}
                          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex-grow min-w-0">
                        <h4 className="font-bold text-gray-100 text-sm group-hover:text-amber-400 truncate">{movie.title}</h4>
                        <div className="flex items-center gap-2 text-[10px] text-neutral-400 mt-0.5">
                          <span>{movie.release_date?.split("-")[0]}</span>
                          <span className="flex items-center gap-0.5 text-amber-500"><AiFillStar size={10} /> {movie.vote_average?.toFixed(1)}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="p-2 border-t border-neutral-800 bg-neutral-950/50 flex justify-between items-center text-[10px] text-neutral-500">
                  <span>{movies.length} results</span>
                  <button onClick={() => setSearchText("")} className="hover:text-red-400 underline">Clear</button>
                </div>
              </div>
            )}
          </div>

          {/* Auth */}
          <div className="flex items-center gap-2">
            {!isAuthenticated ? (
              <Link to="/login" className="px-3 py-1.5 text-xs font-bold rounded-lg border border-neutral-700 bg-neutral-800 hover:bg-neutral-700 transition">
                Sign In
              </Link>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/profile" className="hidden sm:block text-xs font-medium text-amber-400">Profile</Link>
                <button onClick={handleLogout} className="text-red-400 hover:text-red-300">
                  <FiLogOut size={18} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Row 2: Nav */}
        <nav className="flex items-center gap-4 overflow-x-auto scrollbar-hide text-[11px] sm:text-sm font-medium border-t border-neutral-800 pt-2">
          <Link to="/popular" className="whitespace-nowrap hover:text-amber-400 transition">Popular</Link>
          <Link to="/top-rated" className="whitespace-nowrap hover:text-amber-400 transition">Top Rated</Link>
          <Link to="/upcoming" className="whitespace-nowrap hover:text-amber-400 transition">Upcoming</Link>
          <Link to="/watchlist" className="whitespace-nowrap hover:text-amber-400 transition">Watchlist</Link>
          <Link to="/favourites" className="whitespace-nowrap hover:text-amber-400 transition">Favorites</Link>
        </nav>
      </div>
    </div>
  );
}

export default React.memo(Header);