
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav style={{ padding: '20px', textAlign: 'center' }}>
      <Link to="/" style={{ margin: '10px' }}>Home</Link>
      <Link to="/projects" style={{ margin: '10px' }}>Projects</Link>
      <Link to="/contact" style={{ margin: '10px' }}>Contact</Link>
    </nav>
  );
}

export default NavBar;