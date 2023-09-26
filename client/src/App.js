import React, { useCallback, useState } from 'react';
import Particles from 'react-particles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { loadSlim } from 'tsparticles-slim';
import Home from './pages/Home';
import './App.css';
import List from './pages/Subjects';
// import Practical from './pages/Practical';
import PracticalListing from './components/PracticalListing';
import SubjectForm from './admin/SubjectForm';
import AdminDashboard from './admin/AdminDashboard';
import PracticalForm from './admin/PracticalForm';
import SolutionForm from './admin/SolutionForm';
import Solution from './pages/Solution';
import SubjectPracticals from './components/PracticalListing';

const Navbar = () => {
  // Navbar component content
};

const Footer = () => {
  // Footer component content
};

const App = () => {
  const [showNavbarAndFooter, setShowNavbarAndFooter] = useState(true);

  const particlesInit = useCallback(async (engine) => {
    // console.log(engine);
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);

  return (
    <Router>
      <div className="container-full-height">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Subject" element={<List />} />
          <Route path="/subject/:subjectId" element={<PracticalListing />} />

          <Route path="/admin/subjects" element={<SubjectForm />} />
          <Route path="/admin/practicals" element={<PracticalForm />} />
          <Route path="/admin/solutions" element={<SolutionForm />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/:subjectId/:practicalId/:solutionId" element={ <Solution />} />
          {/* <Route path="/651140fbdc5dcf0fd703f478/651164a3d1d6a47b5657e80a/6511737c9a244194daba0cb8" element={ <Solution />} /> */}
          
        <Route path="/subject/:subjectId" element={<SubjectPracticals />} />

        </Routes>
        {showNavbarAndFooter && <Navbar />}
        {showNavbarAndFooter && <Footer />}
        <Particles id="tsparticles" init={particlesInit} loaded={particlesLoaded} options={{ background: { color: { value: '#2c3e50', }, }, fpsLimit: 120, interactivity: { events: { onClick: { enable: true, mode: 'push', }, onHover: { enable: true, mode: 'repulse', }, resize: true, }, modes: { push: { quantity: 4, }, repulse: { distance: 200, duration: 0.1, }, }, }, particles: { color: { value: '#fff', }, links: { color: '#fff', distance: 150, enable: true, opacity: 0.6, width: 1, }, move: { direction: 'none', enable: true, outModes: { default: 'bounce', }, random: false, speed: 2, straight: false, }, number: { density: { enable: true, area: 800, }, value: 80, }, opacity: { value: 0.5, }, shape: { type: 'circle', }, size: { value: { min: 1, max: 5 }, }, }, detectRetina: true, }} />
      </div>
    </Router>
  );
};

export default App;
