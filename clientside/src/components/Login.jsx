import React, { useState } from "react";
import axios from "axios";
import "../scss/Login.scss";
import api from "../api/ApiConfig";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create data to send to the backend
    const loginData = {
      email,
      pass: password,
    };

    try {
      const response = await axios.post(`${api}/login`, loginData);
      if (response.status === 201) {
        alert("Login successful!");
        localStorage.setItem("token", response.data.token);
        navigate("/");
      } else {
        alert("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="app-title">Welcome to Chit-Chat</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        
        {/* Forget Password Link */}
        <p className="forgot-password">
          <a href="/verifyPassEmail">Forgot Password?</a>
        </p>

        <p className="register-link">
          Don't have an account? <a href="/verifyEmail">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
