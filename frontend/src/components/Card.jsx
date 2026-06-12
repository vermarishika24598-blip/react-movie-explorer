import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import trendingmovies from "./utils/Carddata";
const API_KEY =process.env.REACT_APP_TMDB_API_KEY || "3b17db81e34acbea80c6104012518ad8";
export default function Card() {
  const [movies, setMovies] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    trendingmovies().then((data) => setMovies(data));
  }, []);

  useEffect(() => {
    if (!movies.length) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % movies.length);
    }, 5000); // 5 seconds interval for premium feel
    return () => clearInterval(interval);
  }, [movies]);

  if (!movies.length)
    return (
      <div className="flex justify-center items-center h-[450px] bg-neutral-950">
        <div className="animate-spin border-4 border-neutral-800 border-t-amber-500 w-10 h-10 rounded-full" />
      </div>
    );

  const handlePrev = (e) => {
    e.preventDefault(); // Link click trigger hone se rokne ke liye
    setIndex((prev) => (prev === 0 ? movies.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.preventDefault();
    setIndex((prev) => (prev + 1) % movies.length);
  };


  const playTrailer = async (e, movieId) => {
  e.preventDefault();
  e.stopPropagation();

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`
    );

    const data = await res.json();

    const trailer = data.results.find(
      (video) =>
        video.site === "YouTube" &&
        video.type === "Trailer"
    );

    if (trailer) {
      window.open(
        `https://www.youtube.com/watch?v=${trailer.key}`,
        "_blank"
      );
    } else {
      alert("Trailer not available");
    }
  } catch (error) {
    console.error(error);
    alert("Failed to load trailer");
  }
};

  return (
    <div className="w-full overflow-hidden bg-neutral-950 relative group h-[380px] sm:h-[480px] md:h-[550px]">
      
      {/* SLIDER TRACK */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {movies.map((movie) => (
          <div key={movie.id} className="w-full h-full flex-shrink-0 relative">
            <Link to={`/movie/${movie.id}`} className="block w-full h-full relative">
              
              {/* BACKDROP IMAGE WITH GRADIENT OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/70 to-transparent z-10" />
              
              <img
                src={movie.poster || "https://via.placeholder.com/1280x720?text=No+Image"}
                alt={movie.title}
                className="w-full h-full object-cover opacity-80"
              />

              {/* CINEMATIC TEXT CONTENT OVERLAY */}
              <div className="absolute bottom-12 left-6 md:left-16 z-20 max-w-xl pr-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-amber-500 text-black text-xs font-bold px-2.5 py-0.5 rounded-md font-mono">
                    ⭐ {typeof movie.rating === 'number' ? movie.rating.toFixed(1) : movie.rating}
                  </span>
                  <span className="text-xs text-neutral-400 font-medium">
                    {movie.releaseDate ? movie.releaseDate.split("-")[0] : "N/A"}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white line-clamp-2 drop-shadow-md">
                  {movie.title}
                </h2>

                <p className="text-neutral-400 text-xs sm:text-sm mt-3 line-clamp-2 md:line-clamp-3 font-normal max-w-lg leading-relaxed hidden sm:block">
                  {movie.overview}
                </p>

                <div className="mt-5 hidden sm:block">
                  <span className="inline-flex items-center gap-2 bg-amber-500 text-black font-bold px-5 py-2.5 rounded-xl text-sm shadow-xl shadow-amber-500/10 hover:bg-amber-400 transition-all duration-200 transform group-hover:scale-[1.02]">
                    View Details
                  </span>
                </div>
              </div>

              <button
  onClick={(e) => playTrailer(e, movie.id)}
  className="absolute right-6 md:right-16 bottom-16 md:bottom-20 z-20 
               w-14 h-14 md:w-16 md:h-16 rounded-full 
               bg-white/10 backdrop-blur-md border border-white/20 
               text-white flex items-center justify-center 
               shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-300 
               hover:scale-110 hover:bg-black hover:border-red-500 active:scale-95"
  
>
  ▶
</button>
            </Link>
          </div>
        ))}
      </div>

      {/* NAVIGATION BUTTONS */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-neutral-900/60 backdrop-blur-md text-white border border-neutral-800 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-amber-500 hover:text-black hover:border-amber-400 shadow-2xl"
      >
        &#10094;
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-neutral-900/60 backdrop-blur-md text-white border border-neutral-800 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-amber-500 hover:text-black hover:border-amber-400 shadow-2xl"
      >
        &#10095;
      </button>

      {/* BOTTOM DOTS INDICATORS */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex justify-center gap-1.5 bg-neutral-900/40 backdrop-blur-md p-1.5 rounded-full border border-neutral-800/30">
        {movies.map((_, i) => (
          <button
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index ? "w-6 bg-amber-500" : "w-1.5 bg-neutral-600 hover:bg-neutral-400"
            }`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}