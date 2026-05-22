import React from "react";
import "./banner.css";
import { useNavigate } from "react-router-dom";
import {assets} from "../../assets/assets";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <section
      className="banner"
      style={{ backgroundImage: `url(${assets.hero_img})` }}
    >
      <div className="banner-content">
        <h1 className="fade-up">
          WEAR <span>YOUR</span> <br /> VIBE
        </h1>

        <p className="fade-up delay-1">
          Premium streetwear designed for confidence, style, and everyday impact.
        </p>

        <div className="fade-up delay-2">
          <button
            className="banner-btn"
            onClick={() => navigate("/collection")}
          >
            Shop Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default Banner;