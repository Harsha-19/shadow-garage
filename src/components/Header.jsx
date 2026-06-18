import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? 'header-scrolled glass-panel' : ''}`}>
      <div className="container header-container">
        <div className="header-left">
          <div className="logo">
            <span className="logo-shadow">SHADOW</span>
            <span className="logo-garage">GARAGE</span>
          </div>
          <span className="header-tagline">BUILT FOR THE OBSESSED.</span>
        </div>

        <nav className="nav-links">
          <a href="#" className="nav-link">Home</a>
          <a href="#services" className="nav-link">Services</a>
          <a href="#work" className="nav-link">Our Work</a>
          <a href="#about" className="nav-link">About Us</a>
          <a href="#contact" className="nav-link">Contact</a>
        </nav>

        <div className="header-right">
          <a href="#contact" className="btn-book">Book Now</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
