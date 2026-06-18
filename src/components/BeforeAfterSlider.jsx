import React, { useState, useRef, useEffect } from 'react';
import './BeforeAfterSlider.css';

const BeforeAfterSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleInteractionStart = (e) => {
    setIsDragging(true);
    // Move slider immediately to click position
    if (e.clientX) {
      handleMove(e.clientX);
    } else if (e.touches && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleInteractionEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mouseup', handleInteractionEnd);
      window.addEventListener('touchend', handleInteractionEnd);
    } else {
      window.removeEventListener('mouseup', handleInteractionEnd);
      window.removeEventListener('touchend', handleInteractionEnd);
    }
    return () => {
      window.removeEventListener('mouseup', handleInteractionEnd);
      window.removeEventListener('touchend', handleInteractionEnd);
    };
  }, [isDragging]);

  return (
    <section id="work" className="before-after-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">The <span className="text-gradient-red">Transformation</span></h2>
          <p className="section-subtitle">Slide to reveal the Shadow Garage standard.</p>
        </div>

        <div 
          className="slider-container glass-panel"
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          onMouseDown={handleInteractionStart}
          onTouchStart={handleInteractionStart}
        >
          <div className="image-wrapper image-before">
            <img src="/dirty_car.png" alt="Car before detailing" draggable="false" />
            <div className="label label-before">Before</div>
          </div>
          
          <div 
            className="image-wrapper image-after"
            style={{ width: `${sliderPosition}%` }}
          >
            <img src="/clean_car.png" alt="Car after detailing" draggable="false" />
            <div className="label label-after">After</div>
          </div>
          
          <div 
            className="slider-handle"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="slider-handle-line"></div>
            <div className="slider-handle-circle">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSlider;
