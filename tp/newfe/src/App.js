import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './pages/DashBoard';
import Home from './pages/HomePage';
import AddVisit from './pages/AddVisit';
import NavBar from './components/NavBar';
import VisitPage from './pages/VisitPage';

function App() {
  return (
    <Router>
      <div>
        <NavBar />
      </div>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/add-visit" element={<AddVisit />} />
      <Route path="/visit/:visitId" element={<VisitPage />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  </Router>

    
  );
}

export default App;
