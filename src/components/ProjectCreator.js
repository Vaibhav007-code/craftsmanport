// ProjectCreator.js
import { useState, useContext } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import "../styles/ProjectCreator.css";

export default function ProjectCreator() {
  const { addProject } = useContext(AppContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    link: "",
    description: "",
    thumbnail: null,
  });
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError("Image size should be less than 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          thumbnail: {
            file,
            preview: reader.result,
          },
        }));
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Starting project submission with form data:', JSON.stringify(formData, null, 2));
    
    if (!formData.name || !formData.link || !formData.description || !formData.thumbnail) {
      setError("Please fill in all fields and upload a thumbnail");
      return;
    }

    try {
      setIsUploading(true);
      setError(null);

      const newProject = {
        id: Date.now(),
        name: formData.name,
        link: formData.link,
        description: formData.description,
        thumbnail: formData.thumbnail.preview,
        date: Date.now(),
        technologies: [],
        githubUrl: "",
        liveUrl: ""
      };

      console.log('Created new project object:', JSON.stringify(newProject, null, 2));
      const success = await addProject(newProject);
      console.log('Project creation success:', success);

      if (success) {
        setFormData({
          name: "",
          link: "",
          description: "",
          thumbnail: null,
        });
        navigate('/projects');
      } else {
        setError("Failed to add project. Please try again.");
      }
    } catch (err) {
      console.error("Error adding project:", err);
      setError("An error occurred while adding the project");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="project-creator-container">
      <div className="creator-card">
        <h2>Add New Project</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="projectName">Project Name *</label>
            <input
              id="projectName"
              type="text"
              placeholder="Enter project name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="projectLink">Project URL *</label>
            <input
              id="projectLink"
              type="url"
              placeholder="Enter project URL"
              value={formData.link}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, link: e.target.value }))
              }
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="projectDescription">Description</label>
            <textarea
              id="projectDescription"
              placeholder="Enter project description"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, description: e.target.value }))
              }
              rows="4"
            />
          </div>

          <div className="thumbnail-upload">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              hidden
              id="thumbnailInput"
            />
            <label htmlFor="thumbnailInput" className="thumbnail-label">
              {formData.thumbnail ? (
                <img
                  src={formData.thumbnail.preview}
                  alt="Thumbnail preview"
                  className="thumbnail-preview"
                />
              ) : (
                <div className="upload-placeholder">
                  <span>Upload Thumbnail +</span>
                  <small>Click to upload project image</small>
                </div>
              )}
            </label>
          </div>
          
          <button
            type="submit"
            className="submit-button"
            disabled={isUploading}
          >
            {isUploading ? "Adding Project..." : "Add Project"}
          </button>
        </form>
      </div>
    </div>
  );
}
