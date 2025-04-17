import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../App';
import '../styles/Home.css';

export default function Home() {
  const { darkMode } = useContext(AppContext);

  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="gradient-text">Digital Craftsman</h1>
          <p className="hero-subtitle">Building the Future with Code</p>
          <div className="hero-bio">
            <p>
              Hi, I'm Vaibhav Pathak. A full-stack developer passionate about creating
              innovative digital solutions that solve real-world problems through
              elegant code and intuitive design.
            </p>
          </div>
          <div className="cta-buttons">
            <Link to="/projects" className="cta-button">
              <span>View Work</span>
              <div className="hover-effect"></div>
            </Link>
            <Link to="/contact" className="cta-button outline">
              <span>Contact Me</span>
              <div className="hover-effect"></div>
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="animated-blob"></div>
          <div className="tech-grid">
            <div className="tech-icon react">
              <svg className="icon-svg" viewBox="0 0 24 24">
                <path d="M12 18.5c0 .9-.2 1.8-.5 2.6-.4-.2-.8-.3-1.2-.5.2-.5.4-1 .5-1.5.1-.5.2-1 .2-1.5 0-2.7-1.9-5.2-4.6-6.3-.4-.1-.8-.3-1.2-.4 1.1-1.1 2.5-1.9 4-2.3 1.5-.4 3.1-.3 4.6.2 1.5.5 2.8 1.4 3.8 2.6 1 1.2 1.6 2.6 1.8 4.1.2 1.5-.1 3-.8 4.3zM12 5.5c1.5 0 3 .4 4.3 1.1 1.3.7 2.3 1.8 3 3.1.7 1.3 1 2.7 1 4.2 0 .5 0 1-.1 1.5-.1.5-.3 1-.5 1.5-.4.2-.8.3-1.2.5-.3-.8-.5-1.7-.5-2.6 0-2.7-1.9-5.2-4.6-6.3-2.7-1.1-5.8-.6-8 1.2-1.1.9-1.9 2.2-2.3 3.6-.4 1.4-.3 2.9.2 4.3-.4-.2-.8-.3-1.2-.5-.6-1.4-.8-2.9-.6-4.4.2-1.5.8-2.9 1.8-4.1 1-1.2 2.3-2.1 3.8-2.6 1.5-.5 3.1-.6 4.6-.2 1.5.4 2.9 1.2 4 2.3zM6.7 17.3c.4.1.8.3 1.2.4 2.7 1.1 4.6 3.6 4.6 6.3 0 .5-.1 1-.2 1.5-.1.5-.3 1-.5 1.5-.4.2-.8.3-1.2.5-.3-.8-.5-1.7-.5-2.6 0-2.7-1.9-5.2-4.6-6.3-2.7-1.1-5.8-.6-8 1.2-.4.3-.8.7-1.1 1.1.4.4.9.7 1.4 1 1.5.7 3.2 1.1 4.9 1.1 1.7 0 3.4-.4 4.9-1.1 1.5-.7 2.7-1.8 3.6-3.1z"/>
              </svg>
            </div>
            <div className="tech-icon node">
              <svg className="icon-svg" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.18 5 4.05 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
            </div>
            <div className="tech-icon db">
              <svg className="icon-svg" viewBox="0 0 24 24">
                <path d="M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/>
                <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
              </svg>
            </div>
            <div className="tech-icon cloud">
              <svg className="icon-svg" viewBox="0 0 24 24">
                <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h.71C7.37 7.69 9.48 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3s-1.34 3-3 3z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
