import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Rating } from "../components/Movie/Rating";
import { MovieContext } from "../context/MovieContext";
import { Loading } from "../components/Layouts/Loading";

export const MovieDetail = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const { findMovieById } = useContext(MovieContext);

  const [movieDetails, setMovieDetails] = useState({});
  const [loading, setLoading] = useState(false);

  // 뒤로가기
  const goBack = () => {
    navigate(-1);
  };

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
        // rendering 완료 시 loading 상태값 변화
        setLoading(true);
      } catch (err) {
        console.log("detail fetch error: ", err);
      }
    };

    getMovieDetails();
  }, [id, findMovieById]);

  return (
    <div className="">
      {!loading ? (
        <Loading />
      ) : (
        <div
          className="relative flex flex-col items-center justify-center top-0 left-0 w-full h-full min-h-screen bg-no-repeat bg-center bg-cover"
          style={{ backgroundImage: `url(${movieDetails.background_image})` }}
        >
          {/* back button */}
          <button onClick={goBack} className="absolute top-0 left-0 p-5">
            <svg
              className="w-10 h-10 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m17 16-4-4 4-4m-6 8-4-4 4-4"
              />
            </svg>
          </button>

          {/* movie detail info */}
          <div className="flex gap-10 justify-center w-4/5">
            {/* title, poster, rating */}
            <div className="flex flex-col w-2/5 items-center space-y-4">
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

            {/* summary */}
            {movieDetails.summary.length > 0 ? (
              <div className="flex items-center w-2/5 text-white">
                {movieDetails.summary}
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};
