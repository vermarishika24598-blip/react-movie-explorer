const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3/movie/popular";
const IMAGE_URL = "https://image.tmdb.org/t/p/w1280"; // higher-res for carousel


export  default async function Popularmovies() {
  try {
    
    const response = await fetch(`${BASE_URL}?api_key=${API_KEY}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

  
    return data.results.map((movie) => ({
      id: movie.id,
      title: movie.title || "Untitled",
      overview: movie.overview || "No overview available",
      poster: movie.poster_path ? IMAGE_URL + movie.poster_path : null,
      rating: movie.vote_average ?? "N/A",
      releaseDate: movie.release_date || "Unknown",
    }));
  } catch (error) {
    console.error("Error fetching popular movies:", error.message);
    return [];
  }
}
