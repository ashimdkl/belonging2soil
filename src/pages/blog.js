import React, { useState } from 'react';
import './cssForBlog.css';

const BlogPage = () => {
  const [blogText, setBlogText] = useState('');
  const [userName, setUserName] = useState('');
  const [isPopupVisible, setPopupVisibility] = useState(false);

  const handleInputChange = (event) => {
    setBlogText(event.target.value);
  };

  const handleNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handlePostClick = () => {
    if (userName.trim() === '') {
      setPopupVisibility(true);
    } else {
      // Handle the post (you can send it to a server, store in state, etc.)
      console.log('User:', userName);
      console.log('Blog Text:', blogText);
      // Clear the text area and name after posting
      setBlogText('');
      setUserName('');
    }
  };

  return (
    <div className="blog-container">
      <h1 className="blog-heading">Belonging2Soil Blog!</h1>
      <textarea
        className="blog-textarea"
        placeholder="Write your contribution here..."
        value={blogText}
        onChange={handleInputChange}
      />
      <button className="blog-post-button" onClick={handlePostClick}>
        Post
      </button>

      {isPopupVisible && (
        <div className="popup">
          <label>
            Please enter your name:
            <input type="text" value={userName} onChange={handleNameChange} />
          </label>
          <button onClick={() => setPopupVisibility(false)}>OK</button>
        </div>
      )}
    </div>
  );
};

export default BlogPage;
