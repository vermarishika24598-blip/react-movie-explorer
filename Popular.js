import Popularmovies from "./utils/popularcard";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Popular() {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    Popularmovies().then((data) => {
      setPopular(data);
    });
  }, []);

  return (
    <div className="bg-black w-full px-6">
      <h1 className="text-white text-3xl font-bold mb-4 p-5">POPULAR</h1>

      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {popular.map((value) => (
          <Link
            key={value.id}
            to={`/movie/${value.id}`}
            className="bg-[#111] rounded-xl overflow-hidden shadow-xl hover:scale-105 transition duration-300"
          >
          
            <img
              src={value.poster}
              alt={value.title}
              className="w-full h-48 object-cover"
            />

            
            <div className="p-2 text-white">
              <h2 className="font-semibold truncate">{value.title}</h2>
              <p className="line-clamp-2 text-sm text-gray-300">
                {value.overview}
              </p>

              <h3 className="text-sm font-semibold mt-1">
                Rating: ⭐ {value.rating || "N/A"}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}



