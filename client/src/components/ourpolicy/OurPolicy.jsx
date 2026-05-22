import React from 'react';
import { assets } from '../../assets/assets';
import "./OurPolicy.css";

const OurPolicy = () => {
  return (
    <div className="policy-list container">
      <div className="policy-item">
        <img src={assets.exchange_icon} alt="Easy exchange policy" />
        <p className="policy-title">Easy Exchange Policy</p>
        <p className="policy-description">We offer hassle-free exchange policy</p>
      </div>

      <div className="policy-item">
        <img src={assets.quality_icon} alt="Return policy" />
        <p className="policy-title">7 Days Return Policy</p>
        <p className="policy-description">We provide 7 days free return policy</p>
      </div>

      <div className="policy-item">
        <img src={assets.support_img} alt="Customer support" />
        <p className="policy-title">Best Customer Support</p>
        <p className="policy-description">We provide 24/7 customer support</p>
      </div>
    </div>
  );
};

export default OurPolicy;