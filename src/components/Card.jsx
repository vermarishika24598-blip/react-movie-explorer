import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";  // ✅ Add this
import trendingmovies from "./utils/Carddata";

export default function Card() {
  const [movies, setMovies] = useState([]);
  const [index, setIndex] = useState(0);
  const trackRef = useRef(null);

  useEffect(() => {
    trendingmovies().then((data) => setMovies(data));
  }, []);

  useEffect(() => {
    if (!movies.length) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % movies.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [movies]);

  if (!movies.length)
    return (
      <div className="flex justify-center  bg-black ">
        <div className="animate-spin border-4 border-gray-300 border-t-yellow-400 w-10 h-10 rounded-full" />
      </div>
    );

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? movies.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % movies.length);
  };

  return (
    <div className="w-full overflow-hidden py-6 bg-black relative mt-0">
      <div className="relative w-full">
        <div
          ref={trackRef}
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {movies.map((movie) => (
            <Link
              key={movie.id}
              to={`/movie/${movie.id}`}  // 
              className="w-screen flex-shrink-0 px-6"
            >
              <img
                src={movie.poster || "https://via.placeholder.com/500x750?text=No+Image"}
                alt={movie.title}
                className="w-full h-[420px] object-fill rounded-xl cursor-pointer"
              />
              <h3 className="text-white text-xl font-semibold mt-4">
                {movie.title}
              </h3>
            </Link>
          ))}
        </div>

        <button
          onClick={handlePrev}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-3 py-2 rounded-full hover:bg-opacity-80"
        >
          &#10094;
        </button>
        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-3 py-2 rounded-full hover:bg-opacity-80"
        >
          &#10095;
        </button>
      </div>

      <div className="flex justify-center mt-4">
        {movies.map((_, i) => (
          <span
            key={i}
            className={`h-1 w-1   md:h-3 md:w-3 mx-1 rounded-full cursor-pointer ${i === index ? "bg-white" : "bg-gray-500"}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
