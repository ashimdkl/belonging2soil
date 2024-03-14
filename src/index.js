import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mpclmhahhaylfgamcwfh.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1wY2xtaGFoaGF5bGZnYW1jd2ZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAzNjc2NjEsImV4cCI6MjAyNTk0MzY2MX0.J08OOkiOXwp11JFurkAgaSbf17_h29j9SyEZXiudjzg';
const supabase = createClient(supabaseUrl, supabaseKey)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SessionContextProvider supabaseClient={supabase}>
        <App />
      </SessionContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
