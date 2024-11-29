import { useEffect, useState } from "react";

export const Rating = ({ score }) => {
  const [fillStar, setFillStar] = useState(0);
  const [halfStar, setHalfStar] = useState(0);

  useEffect(() => {
    const share = Math.floor(score);
    const remainder = Number((score - share).toFixed(1));

    setFillStar(share);
    setHalfStar(remainder >= 0.5 ? 1 : 0);
  }, [score]);

  const rederStars = () => {
    const stars = [];

    // fill stars
    for (let i = 0; i < fillStar; i++) {
      stars.push(
        <svg
          key={`fill-${i}`}
          className="w-4 h-4 me-1"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.8489 4.21944C13.1649 2.59352 10.8351 2.59353 10.1511 4.21944L8.39736 8.38817L3.84523 8.74898C2.06977 8.8897 1.34986 11.0803 2.70257 12.2259L6.17081 15.1631L5.1112 19.5548C4.69793 21.2677 6.58271 22.6215 8.10274 21.7036L12 19.3502L15.8973 21.7036C17.4173 22.6215 19.3021 21.2677 18.8888 19.5548L17.8292 15.1631L21.2974 12.2259C22.6501 11.0803 21.9302 8.8897 20.1548 8.74898L15.6026 8.38817L13.8489 4.21944Z"
            fill="#FFF23E"
          />
        </svg>
      );
    }

    // half stars
    if (halfStar) {
      stars.push(
        <svg
          key={"half-star"}
          className="w-4 h-4 text-yellow-300 me-1"
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13 4.02367L13 4.01943C13.0003 3.96611 13.002 3.66574 12.7826 3.38671C12.6373 3.20197 12.4168 3.05644 12.1464 3.01299C11.9055 2.97427 11.712 3.0305 11.6066 3.07209C11.4145 3.14795 11.2917 3.2647 11.2579 3.29682C11.205 3.34705 11.1629 3.39623 11.1349 3.43056C11.0325 3.55636 10.9224 3.7292 10.8257 3.88824C10.6176 4.23062 10.3413 4.72773 10.0523 5.26344C9.47037 6.34175 8.80129 7.64214 8.44645 8.33667L8.44591 8.33752L8.44434 8.33784L3.84502 8.70368C2.06976 8.84488 1.34994 11.0429 2.70248 12.1924L6.17033 15.1397L5.11085 19.5464C4.69762 21.2652 6.58219 22.6236 8.10204 21.7026L12.0414 19.3153C12.6336 18.9565 13 18.3193 13 17.6234V4.02367ZM10.9978 4.02367V4.04905C10.9975 4.03756 10.9977 4.02963 10.9977 4.02581L10.9978 4.02367Z"
            fill="#FFF23E"
          />
        </svg>
      );
    }

    return stars;
  };

  return (
    <div className="flex flex-col gap-y-1 items-center justify-center">
      <div className="flex">{rederStars()}</div>
      <div className="flex">
        <p className="ms-1 text-sm font-medium text-white">{score}</p>
        <p className="ms-1 text-sm font-medium text-white">out of</p>
        <p className="ms-1 text-sm font-medium text-white">10</p>
      </div>
    </div>
  );
};
