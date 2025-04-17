// Setup.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setAdminPassword } from "../api"; // Assume your API utility for JSONBin
import "../styles/Setup.css";

const Setup = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const username = "vaibhav"; // For JSONBin storage, this is not used for auth but for reference
  const password = "vaibhav@123";

  useEffect(() => {
    // Here we set the admin password in our JSONBin data.
    // This should be run once to set up the credentials.
    setAdminPassword(password, {}) // No extra security settings for now
      .then(() => {
        navigate("/admin/login");
      })
      .catch((err) => {
        console.error("Admin account setup error:", err);
        setError("Admin account may already exist. Please proceed to login.");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  return (
    <div className="setup-container">
      <div className="setup-box">
        <h2>Admin Setup</h2>
        {error && <div className="error-message">{error}</div>}
        <p>
          The admin account "vaibhav" has been set up with password "vaibhav@123".
          Please proceed to <a href="/admin/login">Login</a>.
        </p>
      </div>
    </div>
  );
};

export default Setup;
