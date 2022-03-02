import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Play from './Play.jsx';
import HowToPlay from './HowToPlay.jsx';
import PrePage from './PrePage';
import RoomFull from './RoomFull.jsx';

export default function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PrePage />} />
        <Route path="/play" element={<Play />} />
        <Route path="/how-to-play" element={<HowToPlay />} />
        <Route path="/room-full" element={<RoomFull />} />
      </Routes>
    </Router>
  );
}
