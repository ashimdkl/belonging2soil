import React from 'react';
import { Routes, Route } from "react-router-dom";
import Sidebar from './pages/sidebar';
import HomePage from './pages/home';
import MissionPage from './pages/mission';
import GalleryPage from './pages/gallery';
import ContributePage from './pages/contribute';
import BlogPage from './pages/blog';
import AiPage from './pages/imageGenerator';
import ProfilePage from './pages/savePhotos';

function App() {
  return (
    <div className="App">
      {/* Sidebar is always rendered without conditional visibility */}
      <div className="sidebar-container">
        <Sidebar />
      </div>

      {/* Application routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mission" element={<MissionPage />} />
        <Route path="/savePhotos" element={<ProfilePage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/contribute" element={<ContributePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/ai" element={<AiPage />} />
      </Routes>
    </div>
  );
}

export default App;
