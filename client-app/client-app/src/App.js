import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/About';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
              <Route path='/' element={<Layout/>}>
                <Route index element={<Home />} />
                <Route path='/about' element={<About/>} />
                <Route path='/contact' element={<Contact/>} />
                
              </Route>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
