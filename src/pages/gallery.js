import React, { useState } from 'react';
import "./cssForGallery.css";

const Gallery = () => {
  const images = [
    'https://u.osu.edu/belongingtosoil/files/2021/11/flying-ant-view.jpg',
    'https://u.osu.edu/belongingtosoil/files/2021/11/riding-on-flying-ant.jpg',
    'https://u.osu.edu/belongingtosoil/files/2021/11/above-ground.jpg',
    'https://u.osu.edu/belongingtosoil/files/2021/11/waterbear-pond.jpg',
    'https://u.osu.edu/belongingtosoil/files/2021/11/chasing-waterbears.jpg',
    'https://u.osu.edu/belongingtosoil/files/2021/11/portal-to-underground-scene.jpg',
    'https://u.osu.edu/belongingtosoil/files/2021/11/millipede-blocks-the-tunnel.jpg',
    'https://u.osu.edu/belongingtosoil/files/2021/11/through-the-tunnel.jpg',
    'https://u.osu.edu/belongingtosoil/files/2021/11/underground-roots.jpg',
    'https://u.osu.edu/belongingtosoil/files/2021/11/entering-underground-chamber.jpg',
    'https://u.osu.edu/belongingtosoil/files/2021/11/lightmapping-underground.jpg'
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="gallery-container">
      <div className="text-overlay">Unity VR Game Gallery</div>
      <div className="image-wrapper">
        <img src={images[currentImageIndex]} alt={`${currentImageIndex + 1}`} />
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
