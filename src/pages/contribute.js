import React, { useState, useEffect } from 'react';
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import "./cssForGallery.css";

import temp1 from '../img/temp1.png';
import temp2 from '../img/temp2.png';
import temp3 from '../img/temp3.png';

import tutorialVideo from '../img/tutorial3.mp4';

const Gallery = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState([
    temp1,
    temp2,
    temp3,
  ]);
  const supabase = useSupabaseClient();

  const fetchImages = async () => {
    const { data, error } = await supabase
      .from('generated_images')
      .select('url');

    if (!error) {
      const fetchedImages = data.map(item => item.url);
      setImages(prevImages => [...prevImages, ...fetchedImages]);
    } else {
      console.error("Error fetching images: ", error.message);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };


  const [showVideo, setShowVideo] = useState(false);

  const toggleVideoPopup = () => {
    setShowVideo(!showVideo);
  };

  useEffect(() => {
    return () => {
      const video = document.querySelector('video');
      if (video) {
        video.pause();
      }
    };
  }, []);


  return (
    <div className="gallery-container">
      <div className="text-overlay">Live User Generated Gallery | Please watch the video for instructions.</div>
      <div className="ig-info-icon" style={{ position: 'absolute', top: '10px', left: '10px', cursor: 'pointer' }}>
      <img
        src="https://www.freeiconspng.com/thumbs/information-icon/information-icon-ual-blue-hq-vers-1-062311-png-10.png"
        alt="Information"
        onClick={toggleVideoPopup}
      />
    </div>
    {showVideo && (
      <div className="ig-video-popup" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10 }}>
        <video width="400" controls autoPlay>
        <source src={tutorialVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <button onClick={toggleVideoPopup} style={{ position: 'absolute', top: '-10px', right: '-10px', cursor: 'pointer' }}>
          Close Video
        </button>
      </div>
    )}


            {/* Information Icon and Video Popup */}
      <div className="ig-info-icon" style={{ position: 'absolute', top: '10px', left: '10px', cursor: 'pointer' }}>
      <img
        src="https://www.freeiconspng.com/thumbs/information-icon/information-icon-ual-blue-hq-vers-1-062311-png-10.png"
        alt="Information"
        onClick={toggleVideoPopup}
      />
      </div>
      
      <div className="image-wrapper">
        <img src={images[currentImageIndex]} alt="Gallery" />
        <button className="arrow left" onClick={goToPreviousImage}>
          &#8249;
        </button>
        <button className="arrow right" onClick={goToNextImage}>
          &#8250;
        </button>
      </div>
    </div>
  );
};

export default Gallery;
