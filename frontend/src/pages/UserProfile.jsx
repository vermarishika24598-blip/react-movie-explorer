import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "../components/MovieCard";
import { useNavigate } from "react-router-dom";
import { fetchUser, logout } from "../redux/userSlice";
import { fetchWatchlist, fetchFavlist } from "../redux/MovieSlice";

export default function UserProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { profile, loading } = useSelector((state) => state.user);
  const moviesState = useSelector((state) => state.movies) || {};
  const watchlist = moviesState?.watchlist || [];
  const favourites = moviesState?.favourite || [];

  const [activeTab, setActiveTab] = useState("favourites");

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      dispatch(fetchWatchlist());
      dispatch(fetchFavlist());
    }
  }, [dispatch, profile]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="bg-neutral-950 min-h-screen flex items-center justify-center">
        <div className="text-neutral-400 text-sm font-medium tracking-widest animate-pulse">
          LOADING...
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="bg-neutral-950 min-h-screen flex flex-col items-center justify-center text-neutral-400">
        <p className="mb-4 text-sm">Please sign in to view your profile.</p>
        <button 
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-white text-black font-semibold text-xs rounded hover:bg-neutral-200 transition"
        >
          LOG IN
        </button>
      </div>
    );
  }

  const renderMovies = (movies) => {
    if (!movies || movies.length === 0) {
      return (
        <div className="py-20 text-center border border-neutral-900 rounded-xl bg-neutral-900/10">
          <p className="text-neutral-600 text-sm">This list is empty.</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {movies.map((movie) => {
          const normalizedMovie = {
            id: movie.movieId || movie._id || Math.random().toString(36).substr(2, 9),
            title: movie.title || "Untitled",
            poster_path: movie.poster || "/default-poster.jpg",
          };
          return (
            <div key={normalizedMovie.id} className="transition-transform duration-200 hover:scale-[1.02]">
              <MovieCard movie={normalizedMovie} />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="bg-neutral-950 min-h-screen text-neutral-200 font-sans antialiased">
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        
        {/* Profile Header (Clean & Minimal) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-neutral-900">
          <div className="flex items-center gap-5">
            <img
              src={profile.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${profile.name}`}
              alt="avatar"
              className="w-16 h-16 rounded-full object-cover bg-neutral-900 border border-neutral-800"
            />
            <div>
              <h1 className="text-2xl font-semibold text-white tracking-tight">
                {profile.name}
              </h1>
              <p className="text-neutral-500 text-sm">{profile.email}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="self-start md:self-auto px-4 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 text-xs font-medium tracking-wide rounded-lg transition"
          >
            Sign Out
          </button>
        </div>

        {/* Navigation Tabs (Apple TV Style) */}
        <div className="space-y-6">
          <div className="flex gap-8 border-b border-neutral-900">
            <button
              onClick={() => setActiveTab("favourites")}
              className={`pb-4 text-sm font-medium tracking-wide transition-all relative ${
                activeTab === "favourites" 
                  ? "text-white font-semibold" 
                  : "text-neutral-500 hover:text-neutral-300"
              }`}
            >
              Favorites ({favourites.length})
              {activeTab === "favourites" && (
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white" />
              )}
            </button>
            
            <button
              onClick={() => setActiveTab("watchlist")}
              className={`pb-4 text-sm font-medium tracking-wide transition-all relative ${
                activeTab === "watchlist" 
                  ? "text-white font-semibold" 
                  : "text-neutral-500 hover:text-neutral-300"
              }`}
            >
              Watchlist ({watchlist.length})
              {activeTab === "watchlist" && (
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white" />
              )}
            </button>
          </div>

          {/* Grid Area */}
          <div className="pt-2">
            {activeTab === "favourites" && renderMovies(favourites)}
            {activeTab === "watchlist" && renderMovies(watchlist)}
          </div>
        </div>

      </div>
    </div>
  );
}