import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-neutral-950 text-neutral-400 pt-16 pb-8 px-6 border-t border-neutral-900">
      
      {/* Title / Logo Accent */}
      <div className="flex flex-col items-center mb-12">
        <h2 className="text-3xl font-black tracking-wider text-white bg-gradient-to-r from-amber-500 to-amber-400 bg-clip-text text-transparent">
          IMDb Explorer
        </h2>
        <div className="h-[2px] w-12 bg-amber-500 mt-2 rounded-full" />
      </div>

      {/* Footer Content Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10 text-sm">

        {/* Movies Links */}
        <div>
          <h3 className="font-bold mb-4 text-neutral-200 tracking-wide uppercase text-xs">Movies</h3>
          <ul className="space-y-2.5">
            <li><Link to="/" className="hover:text-amber-400 transition-colors duration-200">Home</Link></li>
            <li><Link to="/popular" className="hover:text-amber-400 transition-colors duration-200">Popular</Link></li>
            <li><Link to="/top-rated" className="hover:text-amber-400 transition-colors duration-200">Top Rated</Link></li>
            <li><Link to="/upcoming" className="hover:text-amber-400 transition-colors duration-200">Upcoming</Link></li>
          </ul>
        </div>

        {/* Account Links */}
        <div>
          <h3 className="font-bold mb-4 text-neutral-200 tracking-wide uppercase text-xs">Account</h3>
          <ul className="space-y-2.5">
            <li><Link to="/profile" className="hover:text-amber-400 transition-colors duration-200">Profile</Link></li>
            <li><Link to="/watchlist" className="hover:text-amber-400 transition-colors duration-200">Watchlist</Link></li>
            <li><Link to="/favourites" className="hover:text-amber-400 transition-colors duration-200">Favorites</Link></li>
          </ul>
        </div>

        {/* Tech Stack / Project Details */}
        <div>
          <h3 className="font-bold mb-4 text-neutral-200 tracking-wide uppercase text-xs">Project Info</h3>
          <ul className="space-y-2.5 text-neutral-500">
            <li>
              <a
                href="https://www.themoviedb.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-amber-400 transition-colors duration-200"
              >
                TMDB API
              </a>
            </li>
            <li className="cursor-default hover:text-neutral-400 transition-colors">JWT Authentication</li>
            <li className="cursor-default hover:text-neutral-400 transition-colors">Protected Routes</li>
            <li className="cursor-default hover:text-neutral-400 transition-colors">MongoDB Backend</li>
          </ul>
        </div>

        {/* Social Connect with Icons */}
        <div>
          <h3 className="font-bold mb-4 text-neutral-200 tracking-wide uppercase text-xs">Connect</h3>
          <ul className="space-y-3">
            <li>
              <a
                href="https://github.com/vermarishika24598-blip"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors duration-200 group"
              >
                <FaGithub size={18} className="text-neutral-500 group-hover:text-white transition-colors" />
                <span>GitHub</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/rishika-verma-4561502a6/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#0a66c2] transition-colors duration-200 group"
              >
                <FaLinkedin size={18} className="text-neutral-500 group-hover:text-[#0a66c2] transition-colors" />
                <span>LinkedIn</span>
              </a>
            </li>
            <li>
              <a
                href="https://x.com/RishikaVer19716"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors duration-200 group"
              >
                <FaTwitter size={16} className="text-neutral-500 group-hover:text-white transition-colors" />
                <span>Twitter (X)</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Separator Line */}
      <div className="max-w-6xl mx-auto h-[1px] bg-neutral-900 my-8" />

      {/* Disclaimer */}
      <p className="text-center text-xs text-neutral-600 max-w-md mx-auto leading-relaxed">
        This is a personal MERN-stack application built for portfolio tracking purposes. All movie metadata and assets are fetched from TMDB platform.
      </p>

      {/* Copyright branding */}
      <p className="text-center mt-4 text-neutral-500 text-xs font-mono tracking-wider">
        © {new Date().getFullYear()} — Built with ❤️ by Rishika Verma
      </p>
    </footer>
  );
}

export default React.memo(Footer);