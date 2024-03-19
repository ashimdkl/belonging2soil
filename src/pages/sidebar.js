import React from 'react';
import { Link } from "react-router-dom";
import './sidebar.css'; 

const Sidebar = () => {
    return (
        <div className="sidebar">
            <Link to="/">Home</Link>
            <Link to="/mission">Mission</Link>
            <Link to="/ai">B2S AI Tools</Link>
            <Link to="/savePhotos">Profile</Link>
            <Link to="/contribute">User Generated Gallery</Link>
            <Link to="/gallery">Unity VR Game Gallery</Link>
            <Link to="/blog">Website Docs</Link>
            <div className="sidebar-footer">
                <img src="https://accad.osu.edu/sites/default/files/styles/news_and_events_image/public/2023-09/osu-accad-scarlet-stacked-rgbhex_2.jpg?h=252f27fa&itok=OaDi7inN" alt="Company Logo" />
                <p>© 2024 Ashim Dhakal</p>
            </div>
        </div>
    );
};

export default Sidebar;
