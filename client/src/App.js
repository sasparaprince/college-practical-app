import React, { useCallback } from 'react';
import Particles from 'react-particles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { loadSlim } from 'tsparticles-slim';
import Home from './pages/Home';
import './App.css';
import List from './pages/Subjects';
import Navbar from './components/Navbar';
import Practical from './pages/Practical';
import Footer from './components/Footer'; // Import the Footer component
import SubjectForm from './admin/SubjectForm'; // Import the SubjectForm component

const App = () => {
  const particlesInit = useCallback(async (engine) => {
    console.log(engine);
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);

  return (
    <>
      <div className="container-full-height">
        <Navbar />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Subject" element={<List />} />
            <Route path="/subject/:srNo" element={<Practical />} />
            <Route path="/SubjectForm" element={<SubjectForm />} />
            {/* Add more routes as needed */}
          </Routes>
        </Router>
        <Particles id="tsparticles" init={particlesInit} loaded={particlesLoaded} options={{ background: { color: { value: '#E3FDFD', }, }, fpsLimit: 120, interactivity: { events: { onClick: { enable: true, mode: 'push', }, onHover: { enable: true, mode: 'repulse', }, resize: true, }, modes: { push: { quantity: 4, }, repulse: { distance: 200, duration: 0.1, }, }, }, particles: { color: { value: '#000', }, links: { color: '#000', distance: 150, enable: true, opacity: 1, width: 1, }, move: { direction: 'none', enable: true, outModes: { default: 'bounce', }, random: false, speed: 2, straight: false, }, number: { density: { enable: true, area: 800, }, value: 80, }, opacity: { value: 0.5, }, shape: { type: 'circle', }, size: { value: { min: 1, max: 5 }, }, }, detectRetina: true, }} />
        <Footer />
      </div>
    </>
  );
};

export default App;
