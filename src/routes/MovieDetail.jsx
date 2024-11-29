import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Rating } from "../components/Movie/Rating";

export const MovieDetail = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState({});

  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();

    setMovie(json.data.movie);
  };

  useEffect(() => {
    getMovie();
  }, []);

  console.log(movie);

  return (
    <div
      className="flex items-center justify-center top-0 left-0 w-full h-full min-h-screen bg-no-repeat bg-center bg-cover"
      style={{ backgroundImage: `url(${movie.background_image})` }}
    >
      <div className="flex flex-col items-center space-y-4">
        <p className="font-bold text-3xl text-white italic">{movie.title}</p>
        <div className="flex gap-2">
          {movie.genres?.map((genre, idx) => (
            <span
              key={`genre-${idx}`}
              className="badge bg-sub1 border-none text-white font-semibold"
            >
              {genre}
            </span>
          ))}
        </div>
        <img
          src={movie.medium_cover_image}
          alt={movie.title}
          className="border-main border-4 rounded-xl"
        />
        <Rating score={movie.rating} />
      </div>
      <div>{movie.summary}</div>
    </div>
  );
};
