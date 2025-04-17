import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AppContext } from '../App';
import '../styles/Navbar.css';

export default function Navbar() {
  const { darkMode, setDarkMode, isAdmin, adminLogout } = useContext(AppContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <nav className={`navbar ${darkMode ? 'dark' : ''}`}>
      <div className="nav-brand">
        <Link to="/" className="brand-link">
          <div className="logo-glow">VP</div>
          <h1>Vaibhav Pathak</h1>
        </Link>
      </div>

      <div className={`nav-items ${isMenuOpen ? 'open' : ''}`}>
        <div className="nav-links">
          <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            <i className="fas fa-home"></i> Home
          </Link>
          <Link to="/posts" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            <i className="fas fa-newspaper"></i> Posts
          </Link>
          <Link to="/projects" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            <i className="fas fa-code-branch"></i> Projects
          </Link>
          <Link to="/contact" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            <i className="fas fa-envelope-open-text"></i> Contact
          </Link>
        </div>

        <div className="nav-actions">
          <button 
            className="dark-mode-toggle" 
            onClick={toggleDarkMode} 
            aria-label="Toggle dark mode"
          >
            {darkMode ? '🌞' : '🌙'}
          </button>
          
          {isAdmin && (
            <button 
              className="admin-logout"
              onClick={() => {
                adminLogout();
                setIsMenuOpen(false);
              }}
            >
              <i className="fas fa-sign-out-alt"></i>
              <span className="logout-text">Logout</span>
            </button>
          )}

         
        </div>
      </div>

      <button
        className={`hamburger ${isMenuOpen ? 'open' : ''}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  );
}