import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import './Hero.css';
import play from '../../assets/play-button-arrowhead.png';
import info from '../../assets/information.png';

const Hero = () => {
  const [trendingItem, setTrendingItem] = useState(null);
  const API_KEY = '7a63de80532737611d73e9bdbac263c2';
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`)
      .then((response) => {
        const topItem = response.data.results[0];
        setTrendingItem(topItem);
      })
      .catch((error) => console.error('Error fetching trending data:', error));
  }, []);

  const handleViewTrailer = async () => {
    if (!trendingItem) return;

    try {
      const { id, media_type } = trendingItem;
      const response = await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${API_KEY}&language=en-US`
      );
      const trailers = response.data.results;
      const officialTrailer = trailers.find((video) => video.type === 'Trailer' && video.site === 'YouTube');

      if (officialTrailer) {
        window.open(`https://www.youtube.com/watch?v=${officialTrailer.key}`, '_blank');
      } else {
        alert('Trailer not available.');
      }
    } catch (error) {
      console.error('Error fetching trailer:', error);
      alert('Unable to fetch trailer.');
    }
  };

  const handleMoreInfo = () => {
    if (trendingItem) {
      navigate(`/more-info/${trendingItem.media_type}/${trendingItem.id}`);
    }
  };

  if (!trendingItem) {
    return <div>Loading...</div>;
  }

  const title = trendingItem.title || trendingItem.name;
  const year = trendingItem.media_type === 'movie'
    ? trendingItem.release_date?.slice(0, 4)
    : trendingItem.first_air_date?.slice(0, 4);
  const type = trendingItem.media_type === 'movie' ? 'Movie' : 'TV Show';

  return (
    <div className="Hero">
      <div
        className="hero"
        style={{ backgroundImage: `linear-gradient(rgba(11, 50, 94, 0.66),rgba(15, 26, 39, 0.56)),url(https://image.tmdb.org/t/p/original${trendingItem.backdrop_path})` }}
      >
        <div className="content">
          <h1>{title}</h1>
          <h5>{year || 'N/A'} | {type}</h5>
          <p>{trendingItem.overview}</p>
          <div className="butt">
            <button className="but" onClick={handleViewTrailer}>
              <img src={play} alt="" className="play" />
              <h4>Watch Trailer</h4>
            </button>
            <button className="buttu" onClick={handleMoreInfo}>
              <img src={info} alt="" className="play" />
              <h4>More Info</h4>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
