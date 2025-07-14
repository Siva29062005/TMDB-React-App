import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./MoreInfo.css";

const MoreInfo = () => {
  const { type, id } = useParams();
  const [details, setDetails] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [cast, setCast] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatchlisted, setIsWatchlisted] = useState(false);
 

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/${type}/${id}?api_key=${API_KEY}&language=en-US`)
      .then((response) => setDetails(response.data))
      .catch((error) => console.error("Error fetching details:", error));
    axios
      .get(`https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${API_KEY}&language=en-US`)
      .then((response) => {
        const trailer = response.data.results.find((vid) => vid.type === "Trailer");
        if (trailer) {
          setTrailerKey(trailer.key);
        }
      })
      .catch((error) => console.error("Error fetching trailer:", error));

    axios
      .get(`https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${API_KEY}&language=en-US`)
      .then((response) => {
        setCast(response.data.cast.slice(0, 10)); 
      })
      .catch((error) => console.error("Error fetching credits:", error));
  }, [type, id]);

  if (!details) {
    return <div>Loading...</div>;
  }

  const backgroundImage = details.backdrop_path
    ? `https://image.tmdb.org/t/p/original${details.backdrop_path}`
    : `https://image.tmdb.org/t/p/original${details.poster_path}`;

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4, slidesToScroll: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 2, slidesToScroll: 1 } },
    ],
  };

  return (
    <div className="more-info">
      <div
        className="background"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      <div className="contentt">
        <h1>{details.title || details.name}</h1>
        <h5>
          {type === "movie" ? details.release_date?.slice(0, 4) : details.first_air_date?.slice(0, 4)} |{" "}
          {type === "movie" ? "Movie" : "TV Show"}
        </h5>
        <p>{details.overview}</p>
        <div className="extra-details">
          <h4>Rating: {details.vote_average} / 10 || Language: {details.original_language.toUpperCase()} || Genres: {details.genres.map((genre) => genre.name).join(", ")}</h4>
        </div>

        <div className="info-buttons">
          <button
            className={`fav-btn ${isFavorite ? "active" : ""}`}
            onClick={() => setIsFavorite(!isFavorite)}
          >
            {isFavorite ? "❤️ Favorited" : "🤍 Add to Favorite"}
          </button>
          {trailerKey && (
            <button
              className="trailer-btn"
              onClick={() => window.open(`https://www.youtube.com/watch?v=${trailerKey}`, "_blank")}
            >
              🎬 See Trailer
            </button>
          )}
          <button
            className={`watchlist-btn ${isWatchlisted ? "active" : ""}`}
            onClick={() => setIsWatchlisted(!isWatchlisted)}
          >
            {isWatchlisted ? "✅ In Watchlist" : "📌 Add to Watchlist"}
          </button>
        </div>

        <div className="cast-crew-section">
          <h2 style={{color:"black"}}>Cast</h2>
          <Slider {...sliderSettings}>
            {cast.map((member) => (
              <div key={member.id} className="cast-card">
                <img
                  src={
                    member.profile_path
                      ? `https://image.tmdb.org/t/p/w200${member.profile_path}`
                      : "https://via.placeholder.com/200"
                  }
                  alt={member.name}
                />
                <p style={{color:"black"}}>{member.name}</p>
                <small>{member.character}</small>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default MoreInfo;
