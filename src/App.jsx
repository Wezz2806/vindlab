import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import UsahaExperiment from './pages/UsahaExperiment';
import EnergiExperiment from './pages/EnergiExperiment';
import './index.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="page-wrapper">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/usaha" element={<UsahaExperiment />} />
            <Route path="/energi" element={<EnergiExperiment />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
