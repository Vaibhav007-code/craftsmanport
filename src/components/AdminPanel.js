// AdminPanel.js
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App";
import "../styles/AdminPanel.css";

export default function AdminPanel() {
  const { adminLogout, posts, projects, messages, deletePost, deleteProject } = useContext(AppContext);

  const handleDeletePost = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      await deletePost(postId);
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      await deleteProject(projectId);
    }
  };

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Manage your portfolio content and messages</p>
      </div>

      <div className="admin-stats">
        <div className="stat-card">
          <h3>Total Posts</h3>
          <div className="number">{posts.length}</div>
        </div>
        <div className="stat-card">
          <h3>Total Projects</h3>
          <div className="number">{projects.length}</div>
        </div>
        <div className="stat-card">
          <h3>New Messages</h3>
          <div className="number">{messages.length}</div>
        </div>
      </div>

      <div className="admin-content">
        <div className="content-section">
          <h2>Recent Posts</h2>
          <div className="content-list">
            {posts.map(post => (
              <div key={post.id} className="content-item">
                <div className="content-info">
                  <h3>{post.title}</h3>
                  <p>{new Date(post.date).toLocaleDateString()}</p>
                </div>
                <button 
                  className="delete-button"
                  onClick={() => handleDeletePost(post.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="content-section">
          <h2>Recent Projects</h2>
          <div className="content-list">
            {projects.map(project => (
              <div key={project.id} className="content-item">
                <div className="content-info">
                  <h3>{project.name}</h3>
                  <p>{new Date(project.date).toLocaleDateString()}</p>
                </div>
                <button 
                  className="delete-button"
                  onClick={() => handleDeleteProject(project.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="admin-grid">
        <Link to="/admin/posts" className="admin-card">
          <div className="admin-card-icon">📝</div>
          <h2>Posts</h2>
          <p>Create and manage your blog posts</p>
        </Link>

        <Link to="/admin/projects" className="admin-card">
          <div className="admin-card-icon">💼</div>
          <h2>Projects</h2>
          <p>Add and update your portfolio projects</p>
        </Link>

        <Link to="/admin/mailbox" className="admin-card">
          <div className="admin-card-icon">📬</div>
          <h2>Mailbox</h2>
          <p>View and respond to messages</p>
        </Link>
      </div>

      <div className="admin-actions">
        <button className="logout-button" onClick={adminLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
