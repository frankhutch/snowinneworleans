import React from 'react';
import Gallery from './components/Gallery';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 relative">
      <Gallery />
      <div className="fixed-banner">
      <a href="mailto:snowinneworleans@gmail.com?subject=inquiry">prints/hi-res</a>
      </div>
    </div>
  );
}

export default App;