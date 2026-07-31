import About from '../About';
import Skills from '../Skills';

function Home() {
  const skillList = [
    'HTML', 'CSS', 'React', 'Node.js',
    'Python', 'Networking', 'Cybersecurity Essentials'
  ];

  return (
    <>
      <About />
      <Skills skillList={skillList} />
    </>
  );
}

export default Home;