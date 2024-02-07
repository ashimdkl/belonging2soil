import React, { useState, useRef } from 'react';
import './imageGenerator.css';

export const ImageGenerator = () => {
  const [imageUrl, setImageUrl] = useState("/");
  const inputRef = useRef(null);
  const generateImage = async () => {
    if (inputRef.current.value === "") {
      return;
    }
  
    try {
      const response = await fetch(
        "https://api.openai.com/v1/images/generations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            prompt: inputRef.current.value,
            n: 1,
            size: "512x512",
          }),
        }
      );
  
      const data = await response.json();
      const imageUrl = data.data[0].url;
      setImageUrl(imageUrl); // Use the correct setter function here
    } catch (error) {
      console.error("Error generating image:", error);
    }
  };
  

  return (
    <div className="imageGenerator"> 
      <div className="header">Belonging2Soil AI Image Geneator</div>
      <div className="img-loading">
        <div className="img-loading-text">Loading Your Image... Please wait. </div>
        <div className="image"> <img src={imageUrl} alt="generated image" /></div>
      </div>
      
      <div className="search-box">
        <input ref={inputRef} type="text" className='search-input' placeholder='Describe your image...' />
        <div className="generate-btn" onClick={generateImage}>Generate.</div>
      </div>
    </div>
  );
};

export default ImageGenerator;
