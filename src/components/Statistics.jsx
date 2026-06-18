import React, { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import './Statistics.css';

const StatCounter = ({ value, suffix = '', duration = 2 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  
  // Custom transform to handle the decimal for the rating
  const isDecimal = value % 1 !== 0;
  const displayValue = useTransform(springValue, (current) => {
    if (isDecimal) {
      return current.toFixed(1);
    }
    return Math.round(current);
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  return (
    <span ref={ref}>
      <motion.span>{displayValue}</motion.span>
      {suffix}
    </span>
  );
};

const Statistics = () => {
  return (
    <section className="statistics-section">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="statistics-bar glass-panel"
        >
          <div className="stat-item">
            <h3 className="stat-number">
              <StatCounter value={500} suffix="+" />
            </h3>
            <p className="stat-label">Cars Detailed</p>
          </div>
          
          <div className="stat-divider"></div>
          
          <div className="stat-item">
            <h3 className="stat-number text-gradient-red">
              <StatCounter value={4.9} suffix="★" />
            </h3>
            <p className="stat-label">Customer Rating</p>
          </div>
          
          <div className="stat-divider"></div>
          
          <div className="stat-item">
            <h3 className="stat-number">
              <StatCounter value={7} suffix="+" />
            </h3>
            <p className="stat-label">Years Experience</p>
          </div>
          
          <div className="stat-divider"></div>
          
          <div className="stat-item">
            <h3 className="stat-number">
              <StatCounter value={100} suffix="%" />
            </h3>
            <p className="stat-label">Obsession</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Statistics;
