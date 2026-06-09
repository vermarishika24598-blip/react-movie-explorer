import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-white text-gray-800 pt-16 pb-8 px-6 border-t border-gray-200">
      {/* Title */}
      <h2 className="text-center text-3xl font-bold mb-12 text-gray-900">
        Movie Platform
      </h2>

      {/* Footer Content */}
      <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 text-sm">

        {/* Movies */}
        <div>
          <h3 className="font-semibold mb-3 text-gray-900">Movies</h3>
          <ul className="space-y-2 text-gray-600">
            <li><Link to="/" className="hover:text-amber-500 transition">Home</Link></li>
            <li><Link to="/popular" className="hover:text-amber-500 transition">Popular</Link></li>
            <li><Link to="/top-rated" className="hover:text-amber-500 transition">Top Rated</Link></li>
            <li><Link to="/upcoming" className="hover:text-amber-500 transition">Upcoming</Link></li>
          </ul>
        </div>

        {/* Account */}
        <div>
          <h3 className="font-semibold mb-3 text-gray-900">Account</h3>
          <ul className="space-y-2 text-gray-600">
            <li><Link to="/profile" className="hover:text-amber-500 transition">Profile</Link></li>
            <li><Link to="/watchlist" className="hover:text-amber-500 transition">Watchlist</Link></li>
            <li><Link to="/favourites" className="hover:text-amber-500 transition">Favourites</Link></li>
          </ul>
        </div>

        {/* Project */}
        <div>
          <h3 className="font-semibold mb-3 text-gray-900">Project</h3>
          <ul className="space-y-2 text-gray-600">
            <li>
              <a
                href="https://www.themoviedb.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-500 transition"
              >
                TMDB API
              </a>
            </li>
            <li><span className="cursor-default">JWT Authentication</span></li>
            <li><span className="cursor-default">Protected Routes</span></li>
            <li><span className="cursor-default">MongoDB Backend</span></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="font-semibold mb-3 text-gray-900">Social</h3>
          <ul className="space-y-2 text-gray-600">
            <li>
              <a
                href="https://github.com/vermarishika24598-blip"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-500 transition"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/rishika-verma-4561502a6/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-500 transition"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://x.com/RishikaVer19716"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-500 transition"
              >
                Twitter (X)
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-center mt-8 text-xs text-gray-500">
        This is a personal full-stack project built for learning purposes and uses the TMDB API.
      </p>

      {/* Copyright */}
      <p className="text-center mt-3 text-gray-600 text-sm">
        © 2025 — Built by Rishika Verma
      </p>
    </footer>
  );
}

export default React.memo(Footer);
