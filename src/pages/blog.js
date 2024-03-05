import React, { useState } from 'react';
import './cssForBlog.css';

const BlogPage = () => {
  const [posts, setPosts] = useState([
    {
      username: 'Ashim',
      message: 'Currently working on finishing touches of the website!',
      timestamp: new Date(),
    },
    {
      username: 'Ashim',
      message: 'Working on the blog/upload sections',
      timestamp: new Date(),
    },
    {
      username: 'Ashim',
      message: 'Animations fixed in first page.',
      timestamp: new Date(),
    },
    {
      username: 'Ashim',
      message: 'Webpage launch.',
      timestamp: new Date(),
    }
  ]);

  // Edit the blog content directly in the code
  const updatedPosts = [
    {
      username: 'Ashim',
      message: 'wp launch',
      timestamp: new Date(),
    },
    {
      username: 'Ashim',
      message: 'Currently working on finishing touches of the website!',
      timestamp: new Date(),
    },
    {
      username: 'Ashim',
      message: 'Animations fixed in first page.',
      timestamp: new Date(),
    },
    {
      username: 'Ashim',
      message: 'Working on the blog/upload sections',
      timestamp: new Date(),
    },
    {
      username: 'Ashim',
      message: 'Develop the textGeneration and imageGeneration AI models.',
      timestamp: new Date(),
    },
    {
      username: 'Ashim',
      message: 'Begin test cases for the AI models.',
      timestamp: new Date(),
    },
    {
      username: 'B2S Group',
      message: 'Plan space layout for in person exhibition.',
      timestamp: new Date(),
    },
    {
      username: 'Ashim',
      message: 'Sidebar nav / react routerD0M setup for the website.',
      timestamp: new Date(),
    },
    {
      username: 'Ashim',
      message: 'improvise layout for website, more changes, fix changes with first page parallax animations.',
      timestamp: new Date(),
    },
    
  ];

  return (
    <div className="blog-container">
      <h1 className="blog-heading">Belonging2Soil Blog!</h1>

      {/* Display Existing Posts */}
      <div className="posts">
        {updatedPosts.map((post, index) => (
          <div key={index} className="blog-post">
            <p>{post.username}</p>
            <p>{post.message}</p>
            <p>{post.timestamp.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
