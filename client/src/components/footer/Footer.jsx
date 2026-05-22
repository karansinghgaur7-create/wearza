import React from 'react'
import { assets } from '../../assets/assets'
import "./Footer.css"

const Footer = () => {
  return (
    <div className='footer-list container'>

      <div className="footer-item-logo">
        <img src={assets.logo} alt="logo" />
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro soluta,
          molestiae totam laboriosam nulla assumenda ipsum obcaecati.
        </p>
      </div>

      <div className="footer-item">
        <h3 className="footer-title">COMPANY</h3>
        <ul>
          <li>Home</li>
          <li>About Us</li>
          <li>Delivery</li>
          <li>Privacy Policy</li>
        </ul>
      </div>

      <div className="footer-item">
        <h3 className="footer-title">GET IN TOUCH</h3>
        <ul>
          <li>+1 234 567 890</li>
          <li>contact@example.com</li>
        </ul>
      </div>

    </div>
  )
}

export default Footer