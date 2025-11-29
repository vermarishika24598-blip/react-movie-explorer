import { useEffect, useState } from "react";
import Upcomingmovies from "./utils/Upcomingdata";
import { Link } from "react-router-dom";

export default function Upcoming() {
  const [coming, setComing] = useState([]);

  useEffect(() => {
    Upcomingmovies().then((data) => {
      setComing(data);
    });
  }, []);

  return (
    <div className="bg-black w-full px-4 pt-4">
      <h1 className="text-white font-bold text-3xl p-5">Upcoming</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 px-6">
        {coming.map((value) => (
          <Link
            key={value.id}
            to={`/movie/${value.id}`}
            className="bg-[#111] rounded-xl overflow-hidden shadow-lg hover:scale-105 transition duration-300"
          >
            {/* IMAGE FULL WIDTH, SMALL CARD */}
            <img
              src={`https://image.tmdb.org/t/p/w500${value.poster_path}`}
              alt={value.title}
              className="w-full h-48 object-cover"
            />

            {/* CONTENT */}
            <div className="p-2 text-white">
              <h1 className="text-sm font-semibold truncate">{value.title}</h1>
              <p className="text-xs text-gray-400 line-clamp-2">
                {value.overview}
              </p>
              <p className="text-xs mt-1">⭐ {value.rating}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
