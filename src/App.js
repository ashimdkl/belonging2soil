import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import Sidebar from './pages/sidebar'; 
import HomePage from './pages/home';
import MissionPage from './pages/mission';
import GalleryPage from './pages/gallery';
import ContributePage from './pages/contribute';
import BlogPage from './pages/blog';
import AiPage from './pages/imageGenerator';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Adjust toggleSidebar to directly set the state to true or false
  const toggleSidebar = (shouldBeOpen) => {
    // If shouldBeOpen is a boolean, set it directly. Otherwise, toggle the current state.
    setIsSidebarOpen(typeof shouldBeOpen === 'boolean' ? shouldBeOpen : !isSidebarOpen);
  };

  return (
    <div className="App">
      {/* Sidebar toggle button */}
      <button onClick={() => toggleSidebar()} className="sidebar-toggle">
        <img src="https://cdn.iconscout.com/icon/free/png-256/free-three-116-433170.png" alt="Toggle Sidebar" />
      </button>
      
      {/* Conditionally render Sidebar component with a dynamic class for animation */}
      <div className={`sidebar-container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        {/* Pass a function that sets the sidebar state to false */}
        <Sidebar toggleSidebar={() => toggleSidebar(false)} />
      </div>

      {/* Application routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mission" element={<MissionPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/contribute" element={<ContributePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/ai" element={<AiPage />} />
      </Routes>
    </div>
  );
}

export default App;
