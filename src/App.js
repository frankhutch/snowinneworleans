import React from 'react';
import { FiMail } from "react-icons/fi";
import Gallery from './components/Gallery';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 relative">
      <Gallery />
      <div className="fixed-banner">
      <a href="mailto:snowinneworleans@gmail.com?subject=inquiry" title="inquire"><FiMail /></a>
      </div>
    </div>
  );
}

export default App;