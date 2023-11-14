import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Typography } from "antd";

import { ImgItem } from "../modules";
import { mainPoster, mainPosterBlur, mainPosterMob, mainPosterMobBlur } from "../../assets/images";
import "./style.css";

const { Title } = Typography;

const Homepage = () => { 
  useEffect(() => {
    return () => (document.title = "MyAnimeDB");
  }, []);

  return (
    <div className="homepage">
      <Link className="homepage__poster" to="/anime/51535">
        <ImgItem rootClassName="desctop" className="homepage__poster-img" src={mainPoster} placeholder={mainPosterBlur} alt="poster" />
        <ImgItem rootClassName="mobile" className="homepage__poster-img" src={mainPosterMob} placeholder={mainPosterMobBlur} alt="poster" />
      </Link>
      <div className="container">
        <Title level={2}>Welcome to MyAnimeDB!</Title>
      <p>Text 1231</p>
      </div>
    </div>
  );
};

export default Homepage;
