import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import './App.css';
import About from './components/About';
import Skills from './components/Skills';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import ScrollToTopButton from './components/ScrollToTopButton';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Navbar />
      <Home />
      <About />
      <Skills />
      <Portfolio />
      <Contact />
      <ScrollToTopButton />
      <Footer />
      </>
  );
}

export default App;
