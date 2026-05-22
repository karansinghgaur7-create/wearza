// About.jsx

import React from "react";
import "./About.css";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <section className="about container">

      {/* Title */}
      <div className="about-title">
        <h2>
          <span>About</span> Us
        </h2>
      </div>

      {/* About Content */}
      <div className="about-content">

        <div className="about-image-wrapper">
          <img
            className="about-image"
            src={assets.about_img}
            alt="About Us"
          />
        </div>

        <div className="about-text">

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Adipisci mollitia ipsam explicabo consequatur delectus alias.
          </p>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Fugiat eligendi ut beatae nesciunt dolores consectetur ducimus.
          </p>

          <h3>Our Mission</h3>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Qui illum officiis veritatis asperiores amet, reprehenderit
            molestiae ullam aspernatur voluptas voluptates fuga explicabo
            soluta natus sint, obcaecati, non ut aut sit dicta.
          </p>

          <p>
            Facere cupiditate tempora harum repellat consectetur quas
            incidunt consequuntur rerum temporibus quos. Veniam vitae
            nisi dolorem voluptatem minus! Odit reprehenderit accusantium
            corrupti ducimus dolores distinctio.
          </p>

        </div>
      </div>

      {/* Why Choose Us */}
      <div className="choose-title">
        <h2>Why Choose Us</h2>
      </div>

      <div className="choose-container">

        <div className="choose-box">
          <h3>Quality Assurance</h3>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Ipsa nam inventore enim voluptates temporibus illo.
          </p>
        </div>

        <div className="choose-box">
          <h3>Convenience</h3>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Ipsa nam inventore enim voluptates temporibus illo.
          </p>
        </div>

        <div className="choose-box">
          <h3>Exceptional Customer Service</h3>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Ipsa nam inventore enim voluptates temporibus illo.
          </p>
        </div>

      </div>
    </section>
  );
};

export default About;