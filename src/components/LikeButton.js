import { useState, useContext, useEffect } from 'react';
import { AppContext } from '../App';
import '../styles/LikeButton.css';

export default function LikeButton({ postId, initialLikes }) {
  const { posts, setPosts } = useContext(AppContext);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);

  useEffect(() => {
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '{}');
    setLiked(likedPosts[postId] || false);
  }, [postId]);

  const handleLike = () => {
    const newLiked = !liked;
    const newLikes = newLiked ? likes + 1 : likes - 1;
    
    // Update local state
    setLiked(newLiked);
    setLikes(newLikes);

    // Update global posts state
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return { ...post, likes: newLikes };
      }
      return post;
    });
    setPosts(updatedPosts);

    // Update localStorage
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '{}');
    likedPosts[postId] = newLiked;
    localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
  };

  return (
    <button 
      className={`like-button ${liked ? 'liked' : ''}`}
      onClick={handleLike}
      aria-label={liked ? 'Unlike' : 'Like'}
    >
      <i className={`fa-heart ${liked ? 'fas' : 'far'}`}></i>
    </button>
  );
}