import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const Movie = ({ id, coverImg, title, summary, genres, rating }) => {
  return (
    <div className="relative group">
      <div className="relative">
        <img src={coverImg} alt={title} className="w-full" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300`">
          <p className="font-bold text-white text-xl">{rating}/10</p>
          <Link to={`/movie/${id}`}>
            <button
              type="button"
              className="font-bold text-md text-white rounded-lg bg-main px-4 py-1"
            >
              Detail
            </button>
          </Link>
        </div>
      </div>
      <p className="text-lg font-bold truncate mt-2">{title}</p>
    </div>
  );
};

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};
