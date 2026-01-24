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

  if (loading)
    return (
      <div className="text-gray-700 p-6 text-center bg-white">
        Loading profile...
      </div>
    );

  if (!profile)
    return (
      <div className="text-gray-700 p-6 text-center bg-white">
        ⚠️ Profile not found
      </div>
    );

  const tabs = [
    { key: "watchlist", label: "Watchlist" },
    { key: "favourites", label: "Favourites" },
  ];

  const renderMovies = (movies) => {
    if (!movies || movies.length === 0) {
      return (
        <p className="text-gray-500 text-center py-20">
          No movies here yet
        </p>
      );
    }

    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {movies.map((movie) => {
          const normalizedMovie = {
            id:
              movie.movieId ||
              movie._id ||
              Math.random().toString(36).substr(2, 9),
            title: movie.title || "Untitled",
            poster_path: movie.poster || "/default-poster.jpg",
          };
          return <MovieCard key={normalizedMovie.id} movie={normalizedMovie} />;
        })}
      </div>
    );
  };

  return (
    <div className="bg-white min-h-screen text-gray-800 px-6 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-10">
          <div className="flex items-center gap-6">
            <img
              src={profile.avatar || "/default-avatar.png"}
              alt="profile"
              className="w-24 h-24 rounded-full border-2 border-amber-500 object-cover"
            />
            <div>
              <h1 className="text-3xl font-bold text-black">
                {profile.name || "Unknown User"}
              </h1>
              <p className="text-gray-500 text-sm">
                Joined{" "}
                {profile.createdAt
                  ? new Date(profile.createdAt).toLocaleDateString()
                  : "Unknown"}
              </p>
              <div className="flex gap-6 mt-3 text-sm text-gray-700">
                <span>
                  <strong>{watchlist.length}</strong> Watchlist
                </span>
                <span>
                  <strong>{favourites.length}</strong> Favourites
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 border-b border-gray-300 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`pb-3 font-medium ${
                activeTab === tab.key
                  ? "text-amber-600 border-b-2 border-amber-500"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "favourites" && renderMovies(favourites)}
        {activeTab === "watchlist" && renderMovies(watchlist)}
      </div>
    </div>
  );
}
