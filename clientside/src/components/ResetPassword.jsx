import React, { useState, useEffect } from "react";
import axios from "axios";
import "../scss/ResetPassword.scss";
import api from "../api/ApiConfig";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [pwdCriteria, setPwdCriteria] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });

  useEffect(() => {
    const storedEmail = localStorage.getItem("Pemail");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      alert("No email found. Please try again.");
      navigate("/forgetPassword");
    }
  }, [navigate]);

  const validatePassword = (password) => {
    const criteria = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      specialChar: /[@$!%*?&]/.test(password),
    };
    setPwdCriteria(criteria);
    return Object.values(criteria).every(Boolean);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setPassword(value);
    validatePassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (!validatePassword(password)) {
      setError(
        "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    }

    try {
      const response = await axios.put(`${api}/updatePassword`, { pass: password, cpass: confirmPassword, email });

      if (response.status === 201) {
        alert("Password reset successful! Please log in.");
        navigate("/login");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      setError(error.response?.data?.message || "Failed to reset password.");
    }
  };

  return (
    <div className="reset-container">
      <div className="reset-box">
        <h1 className="app-title">Reset Password</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit} className="reset-form">
          <div className="input-group">
            <label>New Password</label>
            <input
              type="password"
              value={password}
              onChange={handleChange}
              placeholder="Enter new password"
              required
            />
          </div>

          {/* Password Criteria Display */}
          <ul className="password-criteria">
            <li className={pwdCriteria.length ? "valid" : "invalid"}>🔹 At least 8 characters</li>
            <li className={pwdCriteria.uppercase ? "valid" : "invalid"}>🔹 At least one uppercase letter</li>
            <li className={pwdCriteria.lowercase ? "valid" : "invalid"}>🔹 At least one lowercase letter</li>
            <li className={pwdCriteria.number ? "valid" : "invalid"}>🔹 At least one number</li>
            <li className={pwdCriteria.specialChar ? "valid" : "invalid"}>🔹 At least one special character (@$!%*?&)</li>
          </ul>

          <div className="input-group">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              required
            />
          </div>
          <button type="submit" className="reset-button">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
