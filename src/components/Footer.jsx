import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-black text-white pt-16 pb-8 px-6">
      {/* Footer Title */}
      <h2 className="text-center text-3xl font-bold mb-12">Movie Categories</h2>

      {/* Categories Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 text-sm">
        {/* Popular */}
        <div>
          <h3 className="font-semibold mb-3">Popular</h3>
          <ul className="space-y-2 opacity-80">
            <li><Link to="/category/action" className="hover:text-amber-500">Action</Link></li>
            <li><Link to="/category/comedy" className="hover:text-amber-500">Comedy</Link></li>
            <li><Link to="/category/horror" className="hover:text-amber-500">Horror</Link></li>
            <li><Link to="/category/fantasy" className="hover:text-amber-500">Fantasy</Link></li>
          </ul>
        </div>

        {/* Top Rated */}
        <div>
          <h3 className="font-semibold mb-3">Top Rated</h3>
          <ul className="space-y-2 opacity-80">
            <li><Link to="/category/drama" className="hover:text-amber-500">Drama</Link></li>
            <li><Link to="/category/thriller" className="hover:text-amber-500">Thriller</Link></li>
            <li><Link to="/category/scifi" className="hover:text-amber-500">Sci-Fi</Link></li>
            <li><Link to="/category/romance" className="hover:text-amber-500">Romance</Link></li>
          </ul>
        </div>

        {/* Upcoming */}
        <div>
          <h3 className="font-semibold mb-3">Upcoming</h3>
          <ul className="space-y-2 opacity-80">
            <li><Link to="/upcoming/2025" className="hover:text-amber-500">2025 Movies</Link></li>
            <li><Link to="/upcoming/trailers" className="hover:text-amber-500">New Trailers</Link></li>
            <li><Link to="/upcoming/announcements" className="hover:text-amber-500">Announcements</Link></li>
            <li><Link to="/upcoming/teasers" className="hover:text-amber-500">Teasers</Link></li>
          </ul>
        </div>

        {/* Genres */}
        <div>
          <h3 className="font-semibold mb-3">Genres</h3>
          <ul className="space-y-2 opacity-80">
            <li><Link to="/genre/adventure" className="hover:text-amber-500">Adventure</Link></li>
            <li><Link to="/genre/mystery" className="hover:text-amber-500">Mystery</Link></li>
            <li><Link to="/genre/crime" className="hover:text-amber-500">Crime</Link></li>
            <li><Link to="/genre/animation" className="hover:text-amber-500">Animation</Link></li>
          </ul>
        </div>

        {/* TV Shows */}
        <div>
          <h3 className="font-semibold mb-3">TV Shows</h3>
          <ul className="space-y-2 opacity-80">
            <li><Link to="/tv/trending" className="hover:text-amber-500">Trending</Link></li>
            <li><Link to="/tv/top-picks" className="hover:text-amber-500">Top Picks</Link></li>
            <li><Link to="/tv/new-episodes" className="hover:text-amber-500">New Episodes</Link></li>
            <li><Link to="/tv/web-series" className="hover:text-amber-500">Web Series</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-semibold mb-3">Support</h3>
          <ul className="space-y-2 opacity-80">
            <li><Link to="/help-center" className="hover:text-amber-500">Help Center</Link></li>
            <li><Link to="/contact" className="hover:text-amber-500">Contact Us</Link></li>
            <li><Link to="/feedback" className="hover:text-amber-500">Feedback</Link></li>
            <li><Link to="/report-issue" className="hover:text-amber-500">Report Issue</Link></li>
          </ul>
        </div>
      </div>

      {/* Social Links */}
      <div className="flex justify-center gap-6 mt-12">
        <a href="https://www.linkedin.com/in/rishika-verma-4561502a6/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">
          <FaLinkedin size={36} />
        </a>
        <a href="https://github.com/vermarishika24598-blip" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors">
          <FaGithub size={36} />
        </a>
        <a href="https://x.com/RishikaVer19716" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
          <FaTwitter size={36} />
        </a>
      </div>

      {/* Copyright */}
      <p className="text-center mt-10 opacity-60 text-sm">
        © 2025 IMDB Clone — All Rights Reserved
      </p>
    </footer>
  );
}

export default React.memo(Footer);
