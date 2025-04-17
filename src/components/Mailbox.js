import { useContext } from 'react';
import { AppContext } from '../App';
import '../styles/Mailbox.css';

export default function Mailbox() {
  const { darkMode, messages, markMessageAsRead, deleteMessage } = useContext(AppContext);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className={`mailbox-container ${darkMode ? 'dark' : ''}`}>
      <h2>📬 Messages</h2>
      {messages.length === 0 ? (
        <p className="no-messages">No messages yet</p>
      ) : (
        <div className="messages-list">
          {messages.map(message => (
            <div 
              key={message.id} 
              className={`message-card ${message.read ? 'read' : 'unread'}`}
            >
              <div className="message-header">
                <div className="message-info">
                  <h3>{message.subject}</h3>
                  <div className="contact-info">
                    <p><strong>From:</strong> {message.name}</p>
                    <p><strong>Email:</strong> {message.email}</p>
                    {message.linkedin && (
                      <p>
                        <strong>LinkedIn:</strong>{' '}
                        <a 
                          href={message.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          View Profile
                        </a>
                      </p>
                    )}
                    <p><strong>Date:</strong> {formatDate(message.date)}</p>
                  </div>
                </div>
                <div className="message-actions">
                  {!message.read && (
                    <button 
                      onClick={() => markMessageAsRead(message.id)}
                      className="mark-read-btn"
                    >
                      Mark as Read
                    </button>
                  )}
              <button 
                    onClick={() => deleteMessage(message.id)}
                    className="delete-btn"
              >
                    Delete
              </button>
                </div>
              </div>
              <div className="message-content">
                {message.message}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}