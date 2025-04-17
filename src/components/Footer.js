import { useContext } from 'react';
import { AppContext } from '../App';
import '../styles/Footer.css';

export default function Footer() {
  const { darkMode } = useContext(AppContext);

  return (
    <footer className={`main-footer ${darkMode ? 'dark' : ''}`}>
      <div className="footer-content">
        <div className="social-links">
          <a href="https://x.com/007Vaibhav_" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
            <i className="fab fa-x-twitter"></i>
            <span>X</span>
          </a>
          <a href="https://www.instagram.com/vaibhav_pathak007/?hl=en" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <i className="fab fa-instagram"></i>
            <span>Instagram</span>
          </a>
          <a href="https://github.com/Vaibhav007-code" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <i className="fab fa-github"></i>
            <span>GitHub</span>
          </a>
          <a href="mailto:pathakvaibhav755@gmail.com" aria-label="Email">
            <i className="fas fa-envelope"></i>
            <span>Email</span>
          </a>
        </div>
        <p className="copyright">© 2024 Vaibhav Pathak. All rights reserved.</p>
      </div>
    </footer>
  );
}