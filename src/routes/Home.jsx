import { useEffect, useState } from "react";
import { Loading } from "../components/Layouts/Loading";
import { Movie } from "../components/Movie/Movie";

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    const json = await (
      await fetch(
        "https://yts.mx/api/v2/list_movies.json?minimum_rating=5&limit=50"
      )
    ).json();

    setMovies(json.data.movies);
    setLoading(false);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="px-5">
      {loading ? (
        <Loading />
      ) : (
        <div className="grid xl:grid-cols-8 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 gap-5">
          {movies.map((movie) => (
            <Movie
              key={`movie-${movie.id}`}
              id={movie.id}
              coverImg={movie.medium_cover_image}
              title={movie.title}
              summary={movie.summary}
              genres={movie.genres}
              rating={movie.rating}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
