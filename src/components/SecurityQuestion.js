import { useState, useContext } from 'react';
import { AppContext } from '../App';
import '../styles/SecurityQuestion.css';

export default function SecurityQuestion({ onSuccess }) {
  const { setSecurityAnswer } = useContext(AppContext);
  const [userAnswer, setUserAnswer] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const savedAnswer = localStorage.getItem('securityAnswer');

    if (savedAnswer && userAnswer.toLowerCase() === savedAnswer.toLowerCase()) {
      localStorage.setItem('mailboxPassword', newPassword);
      alert('Password reset successful!');
      setSecurityAnswer(userAnswer);
      onSuccess();
    } else {
      alert('Incorrect security answer');
    }
  };

  return (
    <div className="security-container">
      <h3>Security Question</h3>
      <p>What's your first pet's name?</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Your answer"
          required
        />
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New password"
          required
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}
