import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Main.css";

const Card = ({ image, title, id, type }) => {
  const navigate = useNavigate();

  const handleMoreInfo = () => {
    console.log(type,id);
    navigate(`/more-info/${type}/${id}`);
  };

  return (
    <div className="cards" onClick={handleMoreInfo}>
      <img src={`https://image.tmdb.org/t/p/original${image}`} alt={title} />
      <h2>{title}</h2>
    </div>
  );
};

const Section = ({ title, data }) => (
  <div className="trending">
    <div className="title">
      <div className="l"></div>
      <h3>{title}</h3>
    </div>
    <div className="scroll">
      {data.map((item) => (
        <Card key={item.id} image={item.poster_path} title={item.title || item.name} id={item.id} type={item.media_type || "movie"} />
      ))}
    </div>
  </div>
);

const Main = () => {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const API_KEY = "7a63de80532737611d73e9bdbac263c2";

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`)
      .then((response) => {
        setTrending(response.data.results);
      })
      .catch((error) => console.error("Error fetching trending data:", error));

    axios
      .get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
      .then((response) => {
        setPopular(response.data.results);
      })
      .catch((error) => console.error("Error fetching popular data:", error));
  }, []);

  return (
    <div className="main">
      <Section title="Trending" data={trending} />
      <Section title="Popular" data={popular} />
    </div>
  );
};

export default Main;
