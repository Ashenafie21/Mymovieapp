
import React, { useState, useEffect } from "react";
import "./Row.css";
import axiosInstance from "./axios";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
const base_url = "https://image.tmdb.org/t/p/original";
function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  useEffect(() => {
    async function fetchData() {
      try {
        // console.log("fetchUrl:", fetchUrl);
        const request = await axiosInstance.get(fetchUrl);
        // console.log("API Response:", request);
        setMovies(request?.data?.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [fetchUrl]);

  //  console.log("Movies:", movies);

  const opts = {
    height: "400",
    width: "100%",
    playerVars: {
      autoplay: 1,
      origin: "http://www.youtube.com",
      controls: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.title || movie?.name || movie.original_name)
        .then((url) => {
          // console.log("YouTube Video URL:", url);
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log("Error fetching trailer:", error));
    }
  };

  // console.log(trailerUrl);
  return (
    <div className="row">
      <h1>{title}</h1>
      <div className="row__posters">
        {movies?.map((movie) => (
          <img
            key={movie.id}
            // ={() => handleClick(movie)}
            onClick={() => handleClick(movie)}
            className={`row__psoter ${isLargeRow && "row__posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path || ""
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      <div className="row__youtube">
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      </div>
    </div>
  );
}

export default Row;
