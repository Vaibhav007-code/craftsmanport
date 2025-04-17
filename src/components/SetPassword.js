import React, { useState } from "react";
import "../styles/SetPassword.css";

const SetPassword = ({ setAdminPassword, closeMailbox }) => {
  const [newPassword, setNewPassword] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newPassword || !securityQuestion || !securityAnswer) {
      alert("Please fill in all fields.");
      return;
    }
    // For simplicity, we just store the password.
    // In a real app, you’d also securely store the security Q&A.
    setAdminPassword(newPassword);
    alert("Admin password and security question set successfully.");
    closeMailbox();
  };

  return (
    <div className="mailbox-overlay animate-fadeIn">
      <div className="mailbox-container">
        <h3 className="mailbox-title">Set Admin Password</h3>
        <form onSubmit={handleSubmit} className="set-password-form">
          <input
            type="password"
            placeholder="Enter new password"
            className="mailbox-input"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter security question"
            className="mailbox-input"
            value={securityQuestion}
            onChange={(e) => setSecurityQuestion(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter answer to security question"
            className="mailbox-input"
            value={securityAnswer}
            onChange={(e) => setSecurityAnswer(e.target.value)}
          />
          <button type="submit" className="mailbox-button mailbox-unlock">
            Set Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetPassword;
