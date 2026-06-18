import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer id="contact" className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <div className="logo">
            <span className="logo-shadow">SHADOW</span>
            <span className="logo-garage">GARAGE</span>
          </div>
          <p className="footer-tagline">Built For The Obsessed.</p>
        </div>
        
        <div className="footer-info">
          <div className="footer-section">
            <h4>Location</h4>
            <p>42, OMR Service Road</p>
            <p>Perungudi, Chennai</p>
            <p>Tamil Nadu 600096</p>
          </div>
          
          <div className="footer-section">
            <h4>Contact</h4>
            <p className="phone-number">+91 97890 12345</p>
            <a href="mailto:booking@shadowgarage.in" className="email-link">booking@shadowgarage.in</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Shadow Garage. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
