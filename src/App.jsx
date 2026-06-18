import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Statistics from './components/Statistics';
import Services from './components/Services';
import BeforeAfterSlider from './components/BeforeAfterSlider';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Statistics />
        <Services />
        <BeforeAfterSlider />
      </main>
      <Footer />
    </>
  );
}

export default App;
