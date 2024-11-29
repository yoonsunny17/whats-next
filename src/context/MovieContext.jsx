import React, { createContext, useState } from "react";

// MovieContext 생성
export const MovieContext = createContext();

// MovieProvider 컴포넌트
export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // 영화 목록 설정 함수
  const updateMovies = (movieList) => {
    setMovies(movieList);
  };

  // 선택된 영화 설정 함수
  const selectMovie = (movie) => {
    setSelectedMovie(movie);
  };

  // 특정 ID의 영화 찾기 함수 (상세 페이지에서 사용)
  const findMovieById = (id) => {
    return movies.find((movie) => movie.id === id);
  };

  return (
    <MovieContext.Provider
      value={{
        movies,
        updateMovies,
        selectedMovie,
        selectMovie,
        findMovieById,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
