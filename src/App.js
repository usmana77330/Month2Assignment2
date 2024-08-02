import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import PostDetail from './components/PostDetail';
import Navbar from './components/Navbar'; 
import Footer from './components/Footer';
import PostProvider from './context/PostContext';
import './styles/App.css';

function App() {
  return (
    <PostProvider>
      <div className="app">
        <Navbar /> {/* Add Navbar here */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/posts/:postId" element={<PostDetail />} />
        </Routes>
        <Footer />
      </div>
    </PostProvider>
  );
}

export default App;
