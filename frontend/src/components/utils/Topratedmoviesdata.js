const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL="https://www.themoviedb.org/movie/top-rated";
const IMAGE_URL="https://media.themoviedb.org/t/p/w440_and_h660_face/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg";

export default async  function Topratedmovies() {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?api_key=3b17db81e34acbea80c6104012518ad8"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch top rated movies");
    }

    const data = await response.json();

    return data.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      overview: movie.overview,
      releasedate: movie.release_date || "Unknown",
    }));
  } catch (error) {
    console.error("Error fetching topratedmovies", error.message);
    return [];
  }
}
