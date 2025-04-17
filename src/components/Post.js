// Post.js
import React, { useContext, useState } from "react";
import { AppContext } from "../App";
import "../styles/Post.css";

export default function Post({ post }) {
  const { isAdmin, updatePost } = useContext(AppContext);
  const [newComment, setNewComment] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const { title, content = "No content available", date, imageUrl, likes = 0, comments = [] } = post || {};

  let formattedDate = "Date not specified";
  if (date) {
    if (typeof date === "number") {
      formattedDate = new Date(date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } else if (date.seconds) {
      formattedDate = new Date(date.seconds * 1000).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } else {
      formattedDate = new Date(date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    }
  }

  const handleLike = async () => {
    const updatedPost = {
      ...post,
      likes: isLiked ? likes - 1 : likes + 1
    };
    await updatePost(updatedPost);
    setIsLiked(!isLiked);
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const updatedPost = {
      ...post,
      comments: [...comments, {
        id: Date.now(),
        text: newComment.trim(),
        date: Date.now()
      }]
    };
    await updatePost(updatedPost);
    setNewComment("");
  };

  return (
    <article className="post-container">
      <div className="post-header">
        <div className="author-info">
          <div className="author-avatar">VP</div>
          <div className="author-details">
            <h3 className="author-name">Vaibhav Pathak</h3>
            <time className="post-time">{formattedDate}</time>
          </div>
        </div>
      </div>

      {imageUrl && (
        <div className="media-container">
          <img
            src={imageUrl}
            alt={title}
            className="post-media"
            loading="lazy"
          />
        </div>
      )}

      <div className="post-content">
        <h2 className="post-title">{title}</h2>
        <p className="post-text">{content}</p>
      </div>

      <div className="post-actions">
        <button 
          className={`like-button ${isLiked ? 'liked' : ''}`}
          onClick={handleLike}
        >
          <span className="like-icon">❤️</span>
          <span className="like-count">{likes}</span>
        </button>
      </div>

      <div className="comments-section">
        <h3>Comments ({comments.length})</h3>
        <div className="comments-list">
          {comments.map(comment => (
            <div key={comment.id} className="comment-item">
              <p className="comment-text">{comment.text}</p>
              <time className="comment-date">
                {new Date(comment.date).toLocaleDateString()}
              </time>
            </div>
          ))}
        </div>
        <form onSubmit={handleComment} className="comment-form">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="comment-input"
          />
          <button type="submit" className="comment-button">
            Post
          </button>
        </form>
      </div>
    </article>
  );
}
