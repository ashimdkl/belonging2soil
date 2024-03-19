// SavePhotos.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SavePhotos from './SavePhotos';
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";

// Mock Supabase Auth and Storage
jest.mock("@supabase/auth-helpers-react", () => ({
  useUser: jest.fn(),
  useSupabaseClient: () => ({
    auth: {
      signInWithOtp: jest.fn(),
      signOut: jest.fn()
    },
    storage: {
      from: () => ({
        upload: jest.fn(),
        remove: jest.fn(),
        list: jest.fn(() => Promise.resolve({ data: null }))
      })
    }
  })
}));

describe('SavePhotos Component', () => {
  it('renders login form for logged-out users', () => {
    useUser.mockImplementation(() => null); // Simulate logged-out state
    render(<SavePhotos />);
    expect(screen.getByText('Enter an email to sign in with a B2S Email Link')).toBeInTheDocument();
  });

  it('triggers login on "Get Email Link" button click', async () => {
    useUser.mockImplementation(() => null); // Simulate logged-out state
    const { supabaseClient } = useSupabaseClient();
    render(<SavePhotos />);
  
    fireEvent.change(screen.getByPlaceholderText('Enter email'), { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByText('Get Email Link'));
  
    expect(supabaseClient.auth.signInWithOtp).toHaveBeenCalledWith({ email: 'test@example.com' });
  });
  
  it('displays uploaded images for a logged-in user', async () => {
    useUser.mockImplementation(() => ({ id: 'user123', email: 'user@example.com' }));
    const { supabaseClient } = useSupabaseClient();
    supabaseClient.storage.from().list.mockResolvedValue({ data: [{ name: 'image1.png' }, { name: 'image2.png' }] });
  
    render(<SavePhotos />);
    await screen.findByAltText('image1.png');
  
    expect(screen.getByAltText('image1.png')).toBeInTheDocument();
    expect(screen.getByAltText('image2.png')).toBeInTheDocument();
  });
  
  it('signs out the user on "Sign Out" button click', async () => {
    useUser.mockImplementation(() => ({ id: 'user123', email: 'user@example.com' }));
    const { supabaseClient } = useSupabaseClient();
  
    render(<SavePhotos />);
    fireEvent.click(screen.getByText('Sign Out'));
  
    expect(supabaseClient.auth.signOut).toHaveBeenCalled();
  });

  it('triggers Supabase upload on image file selection', async () => {
    const testFile = new File(['dummy content'], 'test.png', { type: 'image/png' });
    useUser.mockImplementation(() => ({ id: 'user123', email: 'user@example.com' }));
    const { supabaseClient } = useSupabaseClient();
  
    render(<SavePhotos />);
    const input = screen.getByLabelText('Choose File');
    fireEvent.change(input, { target: { files: [testFile] } });
  
    expect(supabaseClient.storage.from().upload).toHaveBeenCalledWith(expect.stringContaining('user123/'), testFile);
  });
  
  it('deletes an image on "Delete Image" button click', async () => {
    useUser.mockImplementation(() => ({ id: 'user123', email: 'user@example.com' }));
    const { supabaseClient } = useSupabaseClient();
    supabaseClient.storage.from().list.mockResolvedValue({ data: [{ name: 'imageToDelete.png' }] });
  
    render(<SavePhotos />);
    await screen.findByText('Delete Image');
    fireEvent.click(screen.getByText('Delete Image'));
  
    expect(supabaseClient.storage.from().remove).toHaveBeenCalledWith(['user123/imageToDelete.png']);
  });

  
});
