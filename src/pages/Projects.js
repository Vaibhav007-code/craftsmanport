// Projects.js
import { useContext } from "react"; 
import { AppContext } from "../App"; 
import "../styles/Projects.css";  

export default function Projects() {   
  const { projects } = useContext(AppContext);    

  if (!projects || projects.length === 0) {
    return (
      <div className="projects-page">
        <h1>Featured Projects</h1>
        <p className="no-projects">No projects available yet.</p>
      </div>
    );
  }

  return (
    <div className="projects-page">
      <h1>Featured Projects</h1>
      <div className="projects-grid">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <div className="project-image-container">
              {project.thumbnail && (
                <img
                  src={project.thumbnail}
                  alt={project.name}
                  className="project-thumbnail"
                  loading="lazy"
                />
              )}
              <div className="project-overlay">
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  View Project
                </a>
              </div>
            </div>
            <div className="project-info">
              <h3>{project.name}</h3>
              <p>{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
