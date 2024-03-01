import React from 'react';
import { Link } from "react-router-dom";
import './sidebar.css'; 

const Sidebar = ({ toggleSidebar }) => {
    return (
        <div className="sidebar">
            <Link to="/" onClick={() => toggleSidebar(false)}>Home</Link>
            <Link to="/mission" onClick={() => toggleSidebar(false)}>Mission</Link>
            <Link to="/gallery" onClick={() => toggleSidebar(false)}>Gallery</Link>
            <Link to="/contribute" onClick={() => toggleSidebar(false)}>Contribute</Link>
            <Link to="/blog" onClick={() => toggleSidebar(false)}>Blog</Link>
            <Link to="/ai" onClick={() => toggleSidebar(false)}>AI Page</Link>
        </div>
    );
};

export default Sidebar;
