const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3/trending/movie/day";
const IMAGE_URL = "https://image.tmdb.org/t/p/w1280"; 




export default async function trendingmovies() {
  try {
    const response = await fetch(`${BASE_URL}?api_key=${API_KEY}`);

    // Check if fetch succeeded
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }


  
    const data = await response.json();

    
    return data.results.map(movie => ({
      id: movie.id,
      title: movie.title || "Untitled",
      overview: movie.overview || "No overview available",
      poster: movie.poster_path ? IMAGE_URL + movie.poster_path : null,
      rating: movie.vote_average ?? "N/A",
      releaseDate: movie.release_date || "Unknown"
    }));
  } catch (error) {
    console.error("Error fetching trending movies:", error.message);
    console.error(error); 
    return [];
  }
}
