import { useContext, useEffect, useState } from "react";
import { Loading } from "../components/Layouts/Loading";
import { Movie } from "../components/Movie/Movie";
import { MovieContext } from "../context/MovieContext";

function Home() {
  const { movies, updateMovies } = useContext(MovieContext);
  const [loading, setLoading] = useState(true);
  // const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    try {
      const res = await fetch(
        "https://yts.mx/api/v2/list_movies.json?minimum_rating=8&limit=30&sort_by=year"
      );
      const data = await res.json();
      updateMovies(data.data.movies);

      setLoading(false);
    } catch (err) {
      console.log("fetch error: ", err);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="px-5">
      {loading ? (
        <Loading />
      ) : (
        <div className="grid xl:grid-cols-8 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 gap-6">
          {movies.map((movie) => (
            <Movie
              key={`movie-${movie.id}`}
              id={movie.id}
              coverImg={movie.medium_cover_image}
              title={movie.title}
              summary={movie.summary}
              rating={movie.rating}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
