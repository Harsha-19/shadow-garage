import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Hero.css';

// Simple Floating Particles Component
const Particles = () => {
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    const particleArray = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5
    }));
    setParticles(particleArray);
  }, []);

  return (
    <div className="particles-container">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="particle"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            y: ['0vh', '-20vh'],
            x: ['0vw', `${Math.random() * 10 - 5}vw`],
            opacity: [0, 0.5, 0]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

const TrustIndicators = () => {
  const indicators = [
    "Premium Protection",
    "Expert Technicians",
    "Quality Products",
    "Perfection Delivered"
  ];

  return (
    <div className="trust-indicators">
      {indicators.map((text, i) => (
        <motion.div 
          key={i} 
          className="trust-item"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 + (i * 0.1), duration: 0.5 }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="#E50914" strokeWidth="2" className="trust-icon">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>{text}</span>
        </motion.div>
      ))}
    </div>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const yImage = useTransform(scrollY, [0, 500], [0, 100]);
  const opacityImage = useTransform(scrollY, [0, 300], [1, 0.5]);

  return (
    <section className="hero-split">
      <div className="hero-background-gradient"></div>
      <Particles />
      
      <div className="container hero-split-container">
        {/* Left Column: Content */}
        <div className="hero-content-left">
          <motion.div 
            className="hero-label"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            THE APEX OF AUTOMOTIVE CARE
          </motion.div>
          
          <motion.h1 
            className="hero-main-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            BUILT FOR THE <br />
            <span className="text-red-obsessed">OBSESSED.</span>
          </motion.h1>
          
          <motion.p 
            className="hero-main-desc"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Ultra-premium detailing, paint correction, <br />
            and ceramic coatings for those who demand <br />
            absolute perfection.
          </motion.p>
          
          <motion.div 
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <a href="#services" className="btn-primary-new">EXPLORE SERVICES</a>
            <a href="#work" className="btn-secondary-new">VIEW OUR WORK</a>
          </motion.div>
          
          <TrustIndicators />
        </div>

        {/* Right Column: Vehicle Showcase */}
        <div className="hero-content-right">
          <motion.div 
            className="hero-image-wrapper"
            style={{ y: yImage, opacity: opacityImage }}
            initial={{ opacity: 0, scale: 0.95, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 1.2, ease: "easeOut" }}
          >
            <div className="hero-image-glow"></div>
            <img 
              src="/bmw_hero.png" 
              alt="Black BMW 330i M Sport in Shadow Garage Detailing Studio" 
              className="hero-showcase-image"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
