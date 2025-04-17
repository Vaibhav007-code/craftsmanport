// PostCreator.js
import { useState, useContext } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import "../styles/PostCreator.css";

export default function PostCreator() {
  const { addPost } = useContext(AppContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null,
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
          image: {
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
    setError(null);
    
    if (!formData.title.trim() || !formData.content.trim()) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      setIsUploading(true);
      const newPost = {
        title: formData.title.trim(),
        content: formData.content.trim(),
        imageUrl: formData.image ? formData.image.preview : null,
        date: Date.now(),
        id: Date.now().toString(),
        likes: 0,
        comments: []
      };
      
      const success = await addPost(newPost);
      if (success) {
        setFormData({
          title: "",
          content: "",
          image: null,
        });
        navigate("/posts");
      } else {
        setError("Failed to create post. Please try again.");
      }
    } catch (error) {
      console.error("Failed to create post:", error);
      setError("Failed to create post. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="post-creator-container">
      <div className="creator-card">
        <h2>Create New Post</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="postTitle">Title *</label>
            <input
              id="postTitle"
              type="text"
              placeholder="Enter post title"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="postContent">Content *</label>
            <textarea
              id="postContent"
              placeholder="Write your post content"
              value={formData.content}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, content: e.target.value }))
              }
              rows="6"
              required
            />
          </div>

          <div className="image-upload">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              hidden
              id="imageInput"
            />
            <label htmlFor="imageInput" className="image-label">
              {formData.image ? (
                <img
                  src={formData.image.preview}
                  alt="Post image preview"
                  className="image-preview"
                />
              ) : (
                <div className="upload-placeholder">
                  <span>Add Image +</span>
                  <small>Click to upload post image (optional)</small>
                </div>
              )}
            </label>
          </div>
          
          <button
            type="submit"
            className="submit-button"
            disabled={isUploading}
          >
            {isUploading ? "Creating Post..." : "Create Post"}
          </button>
        </form>
      </div>
    </div>
  );
}
