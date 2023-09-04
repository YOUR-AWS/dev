import React from "react";
import { Link } from "react-router-dom";
import Slide from "../../components/slide/Slide";
import { cards } from "../../data";
import "./home.scss";

const Home = () => {
  return (
    <div>
      <Link to="/">
        <Slide data={cards} slidesPerView={5} />
      </Link>
    </div>
  );
};

export default Home;
