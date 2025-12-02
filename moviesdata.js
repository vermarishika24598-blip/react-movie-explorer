import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// We need to re-define the API key here since it was removed
// from the imports. Use the same key as in your Header component.
const API_KEY = "3b17db81e34acbea80c6104012518ad8"; 

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state for API fetch

  const featureComingSoon = (e) => {
    e.preventDefault();
    alert("This feature will be available soon!");
  };

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      try {
        
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
        );
        
        // Handle case where movie ID is not found (404 error)
        if (!response.ok) {
          throw new Error(`Movie not found or API error: ${response.status}`);
        }
        
        const data = await response.json();
        setMovie(data);
        
      } catch (error) {
        console.error("Error fetching movie:", error);
        setMovie(null); // Set movie to null on error
      } finally {
        setLoading(false);
      }
    };

    // Ensure we only fetch if an 'id' is present
    if (id) {
      fetchMovie();
    }
  }, [id]);

  // Handle Loading and Not Found States
  if (loading) {
    return (
      <div className="flex justify-center bg-black py-20">
        <div className="animate-spin border-4 border-gray-300 border-t-yellow-400 w-10 h-10 rounded-full"></div>
      </div>
    );
  }
  
  if (!movie) {
      return (
          <div className="text-white text-center py-20 bg-black text-2xl">
              Movie not found 😔
          </div>
      );
  }

  return (
    <div className="bg-black w-full px-4 py-6 text-white">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Poster */}
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "https://via.placeholder.com/500x750?text=No+Image"
          }
          alt={movie.title}
          className="h-80 w-60 object-cover rounded-xl shadow-2xl ml-20"
        />

        {/* Movie Details */}
        <div className="flex flex-col justify-start gap-4 max-w-3xl ml-20">
          <h1 className="text-3xl font-bold">{movie.title}</h1>

          <div className="flex gap-4">
            <button 
              onClick={featureComingSoon} 
              className="bg-pink-950 hover:bg-yellow-800 px-4 py-2 rounded-lg text-sm font-medium transition-all"
            >
              ➕ Add to Watchlist
            </button>

            <button 
              onClick={featureComingSoon} 
              className="bg-blue-400 hover:bg-blue-900 px-4 py-2 rounded-lg text-sm font-medium transition-all"
            >
              ❤️ Add to Favourite
            </button>
          </div>

          <p className="text-gray-300">{movie.overview}</p>

          <h3 className="text-lg font-semibold">
            Rating: ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
          </h3>
          
          {/* Added more details available from the new API call */}
          {movie.release_date && (
              <h3 className="text-md font-medium text-gray-400">
                  Release Date: {movie.release_date}
              </h3>
          )}
          {movie.runtime && (
              <h3 className="text-md font-medium text-gray-400">
                  Runtime: {movie.runtime} minutes
              </h3>
          )}

        </div>
      </div>
    </div>
  );

}
