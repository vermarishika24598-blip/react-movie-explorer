import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Card from "./components/Card";
import Popular from "./components/Popular";
import Top from "./components/Toprated";
import Upcoming from "./components/Upcoming";
import Footer from "./components/Footer";
import MovieDetails from "./components/moviesdata";
import UserProfile from "./pages/UserProfile";
import { useEffect, useState } from "react";
import { getMe } from "./services/authService";


// ✅ Correct page imports
import Watchlist from "./pages/Watchlist";
import Favorite from "./pages/Favorite";
import Signup from "./pages/signup";
import Login from "./pages/signin";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        if (localStorage.getItem("token")) {
          const res = await getMe();
          setUser(res);
        }
      } catch (err) {
        console.log("Auth failed");
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  if (loading) return null;

  return (
    <>
      <Header user={user} setUser={setUser} />

      <Routes>
        <Route path="/" element={<><Card /><Popular /></>} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/top-rated" element={<Top />} />
        <Route path="/upcoming" element={<Upcoming />} />
        <Route path="/movie/:id" element={<MovieDetails />} />

        <Route path="/signup" element={<Signup  setUser={setUser}
        />} />
        <Route path="/login" element={<Login setUser={setUser} />} />

        {/* 🔐 Protected Route */}
        <Route
          path="/profile"
          element={user ? <UserProfile user={user} /> : <Login setUser={setUser} />}
        />

        <Route
          path="/watchlist"
          element={user ? <Watchlist /> : <Login setUser={setUser} />}
        />

        <Route
          path="/favourites"
          element={user ? <Favorite /> : <Login setUser={setUser} />}
        />
      </Routes>

      <Footer />
    </>
  );
}
