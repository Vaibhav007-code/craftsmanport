import { useState, useContext, useEffect } from 'react';
import { AppContext } from '../App';
import '../styles/CommentSection.css';

export default function CommentSection({ postId }) {
  const { posts, setPosts } = useContext(AppContext);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const post = posts.find(p => p.id === postId);
    setComments(post?.comments || []);
  }, [posts, postId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, {
            id: Date.now(),
            text: newComment,
            timestamp: new Date().toISOString()
          }]
        };
      }
      return post;
    });

    setPosts(updatedPosts);
    setNewComment('');
  };

  return (
    <div className="comment-section">
      <div className="comments-list">
        {comments.map(comment => (
          <div key={comment.id} className="comment">
            <span className="comment-author">user_{Math.floor(Math.random()*1000)}</span>
            <span className="comment-text">{comment.text}</span>
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className="comment-form">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="comment-input"
        />
        <button type="submit" className="post-comment">
          Post
        </button>
      </form>
    </div>
  );
}