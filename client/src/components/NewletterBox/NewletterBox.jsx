import React from "react";
import "./NewletterBox.css";
const NewsletterBox = () => {
  return (
    <div className="newsletter-section">
      <div className="newsletter container">
        <p className="newsletter__title">Subscribe now & get <span>20% off</span> </p>
        <p className="newsletter__description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias totam
          pariatur sunt explicabo, consequatur corporis perspiciatis dolore quod
          tempore asperiores!
        </p>
        <form className="newsletter__form">
          <input
            type="email"
            placeholder="Enter your email"
            className="newsletter__input"
          />
          <button className="newsletter__button">Subscribe</button>
        </form>
      </div>
    </div>
  );
};

export default NewsletterBox;
