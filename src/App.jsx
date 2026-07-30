import Header from './components/Header';
import About from './components/About';
import Skills from './components/Skills';
import Footer from './components/Footer';
import './App.css';

function App() {
  const skillList = ['HTML', 'CSS', 'React', 'Node.js', 'Python', 'Networking', 'Cybersecurity essentials'];

  return (
    <div className="App">
      <Header name="Jiya" />
      <About />
      <Skills skillList={skillList} />
      <Footer />
    </div>
  );
}

export default App;