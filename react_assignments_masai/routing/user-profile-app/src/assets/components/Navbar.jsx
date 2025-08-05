import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ backgroundColor: '#ddd', padding: '1rem' }}>
      <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
      <Link to="/profile" style={{ marginRight: '1rem' }}>Profile</Link>
      <Link to="/settings">Settings</Link>
    </nav>
  );
};

export default Navbar;
