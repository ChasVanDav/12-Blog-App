import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BlogPosts from './components/BlogPosts';
import NavBar from './components/NavBar';
import HomePage from './components/Homepage';
import './index.css';

function App() {
 
  return (
    <Router>
      <div className="app-container">
        <NavBar />
        <Routes>
          <Route path="/" element={<div className="homepage"><HomePage /></div>} />
          <Route path="/blogs" element={ <div className="blogposts"><BlogPosts /></div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
