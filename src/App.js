/* notes: 
  to update site: 
  1) npm run build 
  2) copy contents from build dir and paste at root (replace everything if prompted) 
  3) git add/commit/push 
  4) confirm in github repo under actions (workflow should show deployment step completed)
*/

import React from 'react';
import { FiShoppingCart } from "react-icons/fi";
import Gallery from './components/Gallery';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 relative">
      <Gallery />
      <div className="fixed-banner">
      <a href="mailto:snowinneworleans@gmail.com?subject=inquiry" title="inquire"><FiShoppingCart  /> prints</a>
      </div>
    </div>
  );
}

export default App;