import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Rating } from "../components/Movie/Rating";
import { MovieContext } from "../context/MovieContext";

export const MovieDetail = () => {
  const { id } = useParams();
  const { findMovieById } = useContext(MovieContext);

  const [movieDetails, setMovieDetails] = useState({});

  useEffect(() => {
    // context에서 영화 하나 찾기
    const movie = findMovieById(Number(id));

    const getMovieDetails = async () => {
      try {
        const res = await fetch(
          `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
        );
        const data = await res.json();

        // context에서 찾은 영화의 summary 추가하기
        setMovieDetails({
          ...data.data.movie,
          summary: movie ? movie.summary : "",
        });
      } catch (err) {
        console.log("detail fetch error: ", err);
      }
    };

    getMovieDetails();
  }, [id, findMovieById]);

  // const getMovie = async () => {
  //   const json = await (
  //     await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
  //   ).json();

  //   setMovie(json.data.movie);
  // };

  // useEffect(() => {
  //   getMovie();
  // }, []);

  // console.log(movie);

  console.log("heheh", movieDetails);
  return (
    <div
      className="flex items-center justify-center top-0 left-0 w-full h-full min-h-screen bg-no-repeat bg-center bg-cover"
      style={{ backgroundImage: `url(${movieDetails.background_image})` }}
    >
      <div className="flex w-2/5 flex-col items-center space-y-4">
        <p className="font-bold text-3xl text-white italic">
          {movieDetails.title}
        </p>
        <div className="flex gap-2">
          {movieDetails.genres &&
            movieDetails.genres.map((genre, idx) => (
              <span
                key={`genre-${idx}`}
                className="badge bg-sub1 border-none text-white font-semibold"
              >
                {genre}
              </span>
            ))}
        </div>
        <img
          src={movieDetails.medium_cover_image}
          alt={movieDetails.title}
          className="border-main border-4 rounded-xl"
        />
        <Rating score={movieDetails.rating} />
      </div>
      <div className="w-3/5 mr-10 text-white">{movieDetails.summary}</div>
    </div>
  );
};
