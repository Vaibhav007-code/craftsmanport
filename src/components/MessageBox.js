import { useState, useContext } from 'react';
import { AppContext } from '../App';
import '../styles/MessageBox.css';

export default function MessageBox() {
  const { darkMode, addContactMessage } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      addContactMessage({
        text: message,
        timestamp: new Date().toISOString()
      });
      setMessage('');
      setIsOpen(false);
      alert('Message sent successfully! 🚀');
    }
  };

  return (
    <>
      <button 
        className={`message-trigger ${darkMode ? 'dark' : ''}`}
        onClick={() => setIsOpen(true)}
      >
        <i className="fas fa-comment-alt"></i>
      </button>

      <div className={`message-overlay ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(false)}></div>
      
      <div className={`message-box ${isOpen ? 'open' : ''} ${darkMode ? 'dark' : ''}`}>
        <div className="message-header">
          <h3>Send Me a Message 💌</h3>
          <button className="close-btn" onClick={() => setIsOpen(false)}>
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your message here..."
            className="message-input"
            required
          />
          <button type="submit" className="submit-btn">
            <i className="fas fa-paper-plane"></i> Send Message
          </button>
        </form>
      </div>
    </>
  );
}