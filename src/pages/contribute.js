import React, { useState } from 'react';
import './cssForContribute.css';

const UploadPage = () => {
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setUploadedImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="upload-container">
      <h2>Want to Contribute? Upload your findings!</h2>
      <p style={{ fontStyle: 'italic' }}>Belonging2Soil encourages everyone to contribute!</p>
      <label className="upload-btn-wrapper">
        <button className="btn">Choose Image</button>
        <input type="file" name="myfile" onChange={handleImageUpload} />
      </label>
      {uploadedImage && <img className="uploaded-image" src={uploadedImage} alt="Uploaded" />}
    </div>
  );
};

export default UploadPage;
