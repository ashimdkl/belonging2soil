import React from 'react';
import { render, screen } from '@testing-library/react';
import ImageGenerator from '../../ImageGenerator'; // Adjust the import path based on your project structure

test('renders ImageGenerator component', () => {
  render(<ImageGenerator />);
  
  // Verify that the component renders without crashing
  const headerElement = screen.getByText(/Belonging2Soil AI Image Generator/i);
  expect(headerElement).toBeInTheDocument();
});
