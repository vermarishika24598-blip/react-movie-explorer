const API_KEY = process.env.API_KEY;
const BASE_URL = "https://api.themoviedb.org/3/movie//upcoming";
const IMAGE_URL="https://media.themoviedb.org/t/p/w440_and_h660_face/oJ7g2CifqpStmoYQyaLQgEU32qO.jpg";
 
export default async function Upcomingmovies() {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?api_key=3b17db81e34acbea80c6104012518ad8"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch upcoming movies");
    }

    const data = await response.json();

    return data.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      overview: movie.overview,
      releaseDate: movie.release_date || "Unknown",
    }));
  } catch (error) {
    console.error("Error fetching upcoming movies", error.message);
    return [];
  }
}
