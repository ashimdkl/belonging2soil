import React, { useState, useEffect } from 'react';
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import './cssForContribute.css';

const Contribute = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const user = useUser();
  const supabase = useSupabaseClient();

  async function fetchImages() {
    setIsLoading(true);
    setError('');

    const { data, error } = await supabase
      .from('generated_images')
      .select('url');

    if (error) {
      console.error("Error fetching images: ", error.message);
      setError('Failed to fetch images.');
      setIsLoading(false);
    } else {
      setImages(data.map(item => item.url));
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (user) {
      fetchImages();
    }
  }, [user]);

  async function magicLinkLogin(email) {
    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      alert("Error sending magic link: ", error.message);
    } else {
      alert("Check your email for the magic link!");
    }
  }

  return (
    <div className={user ? 'gallery-container' : 'login-container'}>
      {!user ? (
        <>
          <h2>Please register to view the Gallery!</h2>
          <input type="email" placeholder="Enter your email" className="email-input" />
          <Button onClick={() => magicLinkLogin(document.querySelector('.email-input').value)}>Click to Receive Email Registration Link!</Button>
        </>
      ) : (
        <>
          <h2>Gallery</h2>
          {isLoading ? <div>Loading images...</div> : error ? <div>{error}</div> : (
            <div className="image-grid">
              {images.map((url, index) => (
                <Card key={index} className="image-card">
                  <Card.Img variant="top" src={url} />
                </Card>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Contribute;