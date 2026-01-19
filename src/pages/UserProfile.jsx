import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "../components/MovieCard";
import { useNavigate } from "react-router-dom";
import { fetchUser, logout } from "../redux/userSlice";
import { fetchWatchlist, fetchFavlist } from "../redux/MovieSlice";
import { FiLogOut } from "react-icons/fi";

export default function UserProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // User state
  const { profile, loading } = useSelector((state) => state.user);

  // Movies state safely
  const moviesState = useSelector((state) => state.movies || {});
  const watchlist = moviesState.watchlist || [];
  const favourites = moviesState.favourite || [];
  const status = moviesState.status || "idle";

  const [activeTab, setActiveTab] = useState("favourites");

  // Live debug log
  const [debugLog, setDebugLog] = useState([]);

  // Fetch user only if not loaded
  useEffect(() => {
    if (!profile && !loading) {
      dispatch(fetchUser());
    }
  }, [dispatch, profile, loading]);

  // Fetch watchlist & favourites only after profile is loaded
  useEffect(() => {
    if (profile) {
      dispatch(fetchWatchlist());
      dispatch(fetchFavlist());
    }
  }, [dispatch, profile]);

  // Update debug log whenever relevant state changes
  useEffect(() => {
    const entry = {
      timestamp: new Date().toLocaleTimeString(),
      profile,
      watchlist,
      favourites,
      activeTab,
      status,
    };
    setDebugLog((prev) => [...prev, entry]);
    console.log("DEBUG LOG ENTRY:", entry);
  }, [profile, watchlist, favourites, activeTab, status]);

  if (loading || !profile) {
    return <div className="text-white p-6">Loading...</div>;
  }

  const tabs = [
    { key: "watchlist", label: "Watchlist" },
    { key: "favourites", label: "Favourites" },
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="bg-black min-h-screen text-white px-6 py-8">
      <div className="max-w-7xl mx-auto">

        {/* Profile header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-10">
          <div className="flex items-center gap-6">
            <img
              src=""
              alt="profile"
              className="w-24 h-24 rounded-full border-2 border-yellow-400"
            />
            <div>
              <h1 className="text-3xl font-bold">{profile.name}</h1>
              <p className="text-gray-400 text-sm">
                Joined {profile.createdAt ? new Date(profile.createdAt).toLocaleDateString() : "Unknown"}
              </p>
              <div className="flex gap-6 mt-3 text-sm">
                <span><strong>{watchlist.length}</strong> Watchlist</span>
                <span><strong>{favourites.length}</strong> Favourites</span>
              </div>
            </div>
          </div>
          <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md text-sm font-semibold self-start sm:self-auto">
            <FiLogOut className="inline mr-2" />logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 border-b border-gray-700 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`pb-3 font-medium ${
                activeTab === tab.key
                  ? "text-yellow-400 border-b-2 border-yellow-400"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === "favourites" && (
          favourites.length === 0 ? (
            <p className="text-gray-400 text-center py-20">❤️ No favourite movies yet</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {favourites.map((movie) => (
                <MovieCard
                  key={movie._id || movie.movieId}
                  movie={{ id: movie.movieId, title: movie.title, poster_path: movie.poster }}
                />
              ))}
            </div>
          )
        )}

        {activeTab === "watchlist" && (
          watchlist.length === 0 ? (
            <p className="text-gray-400 text-center py-20">🎬 No movies in watchlist</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {watchlist.map((movie) => (
                <MovieCard
                  key={movie._id || movie.movieId}
                  movie={{ id: movie.movieId, title: movie.title, poster_path: movie.poster }}
                />
              ))}
            </div>
          )
        )}

        {/* LIVE DEBUG PANEL */}
        <div className="text-white bg-gray-800 p-4 mt-10 rounded-md overflow-auto max-h-96">
          <h2 className="font-bold mb-2">LIVE DEBUG PANEL</h2>
          {debugLog.map((entry, i) => (
            <pre key={i} className="mb-2 text-xs">
              [{entry.timestamp}] {JSON.stringify(entry, null, 2)}
            </pre>
          ))}
        </div>

      </div>
    </div>
  );
}
