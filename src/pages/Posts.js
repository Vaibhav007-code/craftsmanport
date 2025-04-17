import React, { useContext } from 'react';
import { AppContext } from '../App';
import '../styles/Post.css';

export default function Posts() {
  const { posts } = useContext(AppContext);

  if (!posts || posts.length === 0) {
    return (
      <div className="posts-container">
        <h1>Blog Posts</h1>
        <p className="no-posts">No posts available yet.</p>
      </div>
    );
  }

  return (
    <div className="posts-container">
      <h1>Blog Posts</h1>
      <div className="posts-grid">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <img 
              src={post.imageUrl || '/placeholder-image.jpg'} 
              alt={post.title} 
              className="post-image" 
              onError={(e) => {
                e.target.src = '/placeholder-image.jpg';
              }}
            />
            <div className="post-content">
              <h2 className="post-title">{post.title}</h2>
              <p className="post-date">{new Date(post.date).toLocaleDateString()}</p>
              <p className="post-excerpt">{post.content.substring(0, 200)}...</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}