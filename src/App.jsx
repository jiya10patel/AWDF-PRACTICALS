import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './components/pages/Home';
import Projects from './components/pages/Projects';
import Contact from './components/pages/Contact';

import './App.css';

function App() {
  return (
    <div className="App">
      <Header name="Jiya" />
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;