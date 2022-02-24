import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Play from './Play.jsx';
import HowToPlay from './HowToPlay.jsx';
import PrePage from './PrePage';

export default function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PrePage />} />
        <Route path="/play" element={<Play />} />
        <Route path="/how-to-play" element={<HowToPlay />} />
      </Routes>
    </Router>
  );
}
