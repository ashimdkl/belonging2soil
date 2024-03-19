import React, { useState, useEffect } from 'react';
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Container, Card } from 'react-bootstrap';
import './cssForContribute.css';

const Contribute = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
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
    fetchImages();
  }, []);

  return (
    <Container className='gallery-container'>
      <h2>Live User-Generated-Gallery!</h2>
      <h3>Please wait for instructions to begin.</h3>
      {isLoading ? (
        <div>Loading images...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="image-grid">
          {images.map((url, index) => (
            <Card key={index} className="image-card">
              <Card.Img variant="top" src={url} />
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
};

export default Contribute;
