import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate, AnimatePresence } from 'framer-motion';
import './Services.css';

const vehicleTypes = [
  { id: 'hatchback', label: 'Hatchback', examples: 'Swift, i20, Baleno, Altroz' },
  { id: 'sedan', label: 'Sedan', examples: 'Verna, City, Slavia, Virtus GT, BMW 3 Series' },
  { id: 'suv', label: 'SUV', examples: 'Creta, Seltos, Harrier, Compass' },
  { id: 'full-suv', label: 'Full-Size SUV', examples: 'Fortuner, Hilux, Gloster, Endeavour' },
  { id: 'coupe', label: 'Coupe / Luxury', examples: 'BMW M4, BMW 2 Series, Audi A5' }
];

const packages = [
  {
    id: 'wash',
    title: 'Shadow Wash',
    description: 'Premium exterior wash and refresh.',
    pricing: {
      'hatchback': 1499,
      'sedan': 1799,
      'suv': 2299,
      'full-suv': 2999,
      'coupe': 3499
    }
  },
  {
    id: 'restore',
    title: 'Shadow Restore',
    description: 'Deep cleaning and paint enhancement.',
    pricing: {
      'hatchback': 4999,
      'sedan': 5999,
      'suv': 6999,
      'full-suv': 8499,
      'coupe': 9999
    }
  },
  {
    id: 'gloss',
    title: 'Shadow Gloss',
    description: 'Professional ceramic coating package.',
    pricing: {
      'hatchback': 14999,
      'sedan': 17999,
      'suv': 20999,
      'full-suv': 24999,
      'coupe': 29999
    }
  },
  {
    id: 'elite',
    title: 'Shadow Elite',
    description: 'Multi-stage paint correction and premium ceramic protection.',
    pricing: {
      'hatchback': 24999,
      'sedan': 29999,
      'suv': 34999,
      'full-suv': 39999,
      'coupe': 49999
    }
  }
];

function AnimatedPrice({ value }) {
  const count = useMotionValue(value);
  const rounded = useTransform(count, Math.round);
  const display = useTransform(rounded, (latest) => `₹${latest.toLocaleString('en-IN')}`);

  useEffect(() => {
    const controls = animate(count, value, { duration: 0.6, ease: "easeOut" });
    return controls.stop;
  }, [value, count]);

  return <motion.span>{display}</motion.span>;
}

const Services = () => {
  const [selectedVehicle, setSelectedVehicle] = useState('sedan');

  const currentVehicleData = vehicleTypes.find(v => v.id === selectedVehicle);

  return (
    <section id="services" className="pricing-section">
      <div className="container">
        <div className="section-header">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            Premium Detailing <span className="text-gradient-red">Packages</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-subtitle"
          >
            Select your vehicle type to view personalized pricing.
          </motion.p>
        </div>

        {/* Vehicle Selector */}
        <div className="selector-wrapper">
          <div className="vehicle-selector">
            {vehicleTypes.map((type) => {
              const isSelected = selectedVehicle === type.id;
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedVehicle(type.id)}
                  className={`selector-tab ${isSelected ? 'active' : ''}`}
                >
                  <span className="tab-icon">{type.icon}</span>
                  <span className="tab-label">{type.label}</span>
                  {isSelected && (
                    <motion.div
                      layoutId="activeTab"
                      className="active-indicator"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedVehicle}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="example-vehicles"
          >
            <span className="example-label">Examples: </span>
            <span className="example-text">{currentVehicleData.examples}</span>
          </motion.div>
        </AnimatePresence>

        {/* Package Cards */}
        <div className="packages-grid">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="package-card glass-panel"
            >
              <div className="package-header">
                <h3 className="package-title">{pkg.title}</h3>
              </div>
              <div className="package-price">
                <AnimatedPrice value={pkg.pricing[selectedVehicle]} />
              </div>
              <p className="package-desc">{pkg.description}</p>
              <button className="btn-package">Book Package</button>
            </motion.div>
          ))}
        </div>

        {/* Trust Message */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="trust-message"
        >
          <p>Final pricing may vary depending on vehicle condition, paint correction requirements, and additional protection packages.</p>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="cta-section glass-panel"
        >
          <h2 className="cta-headline">YOUR CAR ISN'T GENERIC.</h2>
          <h2 className="cta-subheadline text-gradient-red">YOUR DETAILING SHOULDN'T BE EITHER.</h2>
          <button className="btn-primary cta-btn">GET A CUSTOM QUOTE</button>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
