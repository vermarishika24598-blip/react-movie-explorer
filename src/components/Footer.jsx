import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-black text-white pt-16 pb-8 px-6">
      {/* Title */}
      <h2 className="text-center text-3xl font-bold mb-12">
        Movie Platform
      </h2>

      {/* Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 text-sm">

        {/* Movies */}
        <div>
          <h3 className="font-semibold mb-3">Movies</h3>
          <ul className="space-y-2 opacity-80">
            <li><Link to="/" className="hover:text-amber-500">Home</Link></li>
            <li><Link to="/popular" className="hover:text-amber-500">Popular</Link></li>
            <li><Link to="/top-rated" className="hover:text-amber-500">Top Rated</Link></li>
            <li><Link to="/upcoming" className="hover:text-amber-500">Upcoming</Link></li>
          </ul>
        </div>

        {/* Account */}
        <div>
          <h3 className="font-semibold mb-3">Account</h3>
          <ul className="space-y-2 opacity-80">
            <li><Link to="/login" className="hover:text-amber-500">Login</Link></li>
            <li><Link to="/signup" className="hover:text-amber-500">Sign Up</Link></li>
            <li><Link to="/profile" className="hover:text-amber-500">Profile</Link></li>
          </ul>
        </div>

        {/* Library */}
        <div>
          <h3 className="font-semibold mb-3">Library</h3>
          <ul className="space-y-2 opacity-80">
            <li><Link to="/watchlist" className="hover:text-amber-500">Watchlist</Link></li>
            <li><Link to="/favourites" className="hover:text-amber-500">Favourites</Link></li>
          </ul>
        </div>

        {/* Project */}
        <div>
          <h3 className="font-semibold mb-3">Project</h3>
          <ul className="space-y-2 opacity-80">
            <li>
              <a
                href="https://www.themoviedb.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-500"
              >
                TMDB API
              </a>
            </li>
            <li><span className="cursor-default">JWT Authentication</span></li>
            <li><span className="cursor-default">Protected Routes</span></li>
            <li><span className="cursor-default">MongoDB Backend</span></li>
          </ul>
        </div>
      </div>

      {/* Social */}
      <div className="flex justify-center gap-6 mt-12">
        <a
          href="https://www.linkedin.com/in/rishika-verma-4561502a6/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-500"
        >
          <FaLinkedin size={34} />
        </a>
        <a
          href="https://github.com/vermarishika24598-blip"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-400"
        >
          <FaGithub size={34} />
        </a>
        <a
          href="https://x.com/RishikaVer19716"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-400"
        >
          <FaTwitter size={34} />
        </a>
      </div>

      {/* Bottom */}
      <p className="text-center mt-8 text-xs opacity-50">
        Full-stack movie application built with React, Node.js, Express & MongoDB.
      </p>

      <p className="text-center mt-3 opacity-60 text-sm">
        © 2025 — Built by Rishika Verma
      </p>
    </footer>
  );
}

export default React.memo(Footer);
