import { useState, useContext } from 'react';
import { AppContext } from '../App';
import '../styles/Contact.css';

export default function Contact() {
  const { darkMode, addMessage } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    linkedin: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      const newMessage = {
        id: Date.now().toString(),
        name: formData.name.trim(),
        email: formData.email.trim(),
        linkedin: formData.linkedin.trim(),
        subject: formData.subject.trim() || 'No Subject',
        message: formData.message.trim(),
        date: new Date().toISOString(),
        read: false
      };

      const success = await addMessage(newMessage);
      if (success) {
        setFormData({
          name: '',
          email: '',
          linkedin: '',
          subject: '',
          message: ''
        });
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`contact-container ${darkMode ? 'dark' : ''}`}>
      <div className="contact-card">
        <h1>💌 Send Me a Message</h1>
        {success && (
          <div className="success-message">
            Message sent successfully! 🚀
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="linkedin">LinkedIn Profile</label>
            <input
              type="url"
              id="linkedin"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              placeholder="Your LinkedIn profile URL"
            />
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Message subject"
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message *</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message here..."
              required
            />
          </div>

          <button 
            type="submit" 
            className="submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'} <i className="fas fa-paper-plane"></i>
          </button>
        </form>
      </div>
    </div>
  );
}