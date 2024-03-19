import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { v4 as uuidv4 } from 'uuid';
import './savePhotos.css'; // Assuming this CSS file contains custom styles in addition to Bootstrap

const CDNURL = "https://mpclmhahhaylfgamcwfh.supabase.co/storage/v1/object/public/images/";

function SavePhotos() {
  const [email, setEmail] = useState("");
  const [images, setImages] = useState([]);
  const user = useUser();
  const supabase = useSupabaseClient();

  async function getImages() {
    if (!user) return; // Ensure user is logged in
    const { data, error } = await supabase
      .storage
      .from('images')
      .list(user.id + "/", { limit: 100, offset: 0, sortBy: { column: "name", order: "asc" }});
    if (data) {
      setImages(data);
    } else {
      console.error("Error loading images:", error);
    }
  }
  

  useEffect(() => {
    if (user) {
      getImages();
    }
  }, [user]);


  async function magicLinkLogin() {
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email
      });
  
      if (error) {
        throw error;
      }
  
      alert("Check your email for a Supabase Magic Link to log in!");
    } catch (error) {
      console.error("Error communicating with Supabase:", error.message);
      alert("Error communicating with Supabase. Please make sure to use a valid email address.");
    }
  }
  

  async function signOut() {
    await supabase.auth.signOut();
  }

  async function uploadImage(e) {
    if (!user) {
      console.error("User is not logged in.");
      return;
    }
    let file = e.target.files[0];
    const { error } = await supabase.storage.from('images').upload(user.id + "/" + uuidv4(), file);
    if (!error) {
      getImages(); // Refresh the images after successful upload
    } else {
      console.error("Error uploading image:", error);
    }
  }
  

  async function deleteImage(imageName) {
    if (!user) {
      console.error("User is not logged in.");
      return;
    }
    const { error } = await supabase.storage.from('images').remove([user.id + "/" + imageName]);
    if (!error) {
      getImages(); // Refresh the images after successful deletion
    } else {
      console.error("Error deleting image:", error);
    }
  }
  

  return (
    <Container align="center" className="mt-4 sp-container"> {/* Utilizes Bootstrap's Container for alignment and margin */}
      {user === null ? (
        <>
          <h1>Explore Your Creations</h1>
          <Form className="sp-login-form"> {/* Bootstrap Form for layout */}
            <Form.Group className="mb-3"> {/* Form Group for input grouping */}
              <Form.Label>Enter an email to sign in with a B2S Email Link</Form.Label>
              <Form.Label>- Please check your email to log in - </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" onClick={magicLinkLogin}>Get Email Link</Button> {/* Bootstrap Button for actions */}
          </Form>
        </>
      ) : (
        <>
          <h1>Your ImageWall</h1>
          <Button variant="secondary" onClick={signOut} className="sp-sign-out">Sign Out</Button> {/* Positioned using custom CSS */}
          <div className="sp-user-info">Current user: {user.email}</div>
          <Form.Group className="mb-3 sp-upload-form">
            <Form.Control type="file" accept="image/png, image/jpeg" onChange={uploadImage} />
          </Form.Group>
          <Row xs={1} md={3} className="g-4 sp-g-4"> {/* Bootstrap Grid for responsive image layout */}
            {images.map((image) => (
              <Col key={image.name}> {/* Bootstrap Column for grid items */}
                <Card> {/* Bootstrap Card for image display */}
                  <Card.Img variant="top" src={CDNURL + user.id + "/" + image.name} />
                  <Card.Body>
                    <Button variant="danger" onClick={() => deleteImage(image.name)}>Delete Image</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}
    </Container>
  );
}

export default SavePhotos;
