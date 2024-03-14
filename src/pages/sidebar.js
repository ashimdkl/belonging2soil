import React from 'react';
import { Link } from "react-router-dom";
import './sidebar.css'; 

const Sidebar = () => {
    return (
        <div className="sidebar">
            <Link to="/">Home</Link>
            <Link to="/mission">Mission</Link>
            <Link to="/gallery">Gallery</Link>
            <Link to="/contribute">Contributions</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/ai">AI Page</Link>
            <div className="sidebar-footer">
                <img src="https://accad.osu.edu/sites/default/files/styles/news_and_events_image/public/2023-09/osu-accad-scarlet-stacked-rgbhex_2.jpg?h=252f27fa&itok=OaDi7inN" alt="Company Logo" />
                <p>© 2024 B2S</p>
            </div>
        </div>
    );
};

export default Sidebar;
