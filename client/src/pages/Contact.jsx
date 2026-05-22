import React from 'react'
import { assets } from '../assets/assets'
import './Contact.css'

const Contact = () => {
  return (
    <div className="contact-container">
      
      <div className="contact-title">
        <h1><span>CONTACT</span> US</h1>
      </div>

      <div className="contact-content">
        
        <img
          className="contact-image"
          src={assets.contact_img}
          alt="contact"
        />

        <div className="contact-info">
          
          <p className="contact-heading">Our Store</p>

          <p className="contact-text">
            54709 Willms Station <br />
            Suite 350, Washington
          </p>

          <p className="contact-text">
            Tel: (415) 555-0132 <br />
            Email: admin@forever.com
          </p>

          <p className="contact-heading">
            Career at Forever
          </p>

          <p className="contact-text">
            Learn more about our team and job openings
          </p>

          <button className="contact-button">
            Explore Jobs
          </button>

        </div>
      </div>
    </div>
  )
}

export default Contact