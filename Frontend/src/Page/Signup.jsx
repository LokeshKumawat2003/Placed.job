import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../pageStyle/signup.css';
import { toast } from "react-toastify";
import { useUrl } from "../context/UrlContext";

const Signup = () => {
  const { url } = useUrl();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!email || !password || !username || !number) {
      toast("All fields are required!");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast("Invalid email format");
      return;
    }

    const userData = {
      name: username,
      email: email,
      number: number,
      password: password,
      role: role,
    };

    try {
      const response = await axios.post(`${url}/api/signup`, userData);
      console.log(response.data);
      toast("Signup successful. Please log in.");
      navigate("/login");
    } catch (error) {
      console.error("Error during signup:", error);
      toast("Signup failed. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-header">
        <h1 className="signup-title">Create an Account</h1>
        <p className="signup-subtitle">
          Join us today and start using our services by creating an account.
        </p>
      </div>

      <div className="signup-form-container">
        <div className="form-group">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            id="username"
            className="form-input"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">Email Address</label>
          <input
            type="email"
            id="email"
            className="form-input"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="number" className="form-label">Phone Number</label>
          <input
            type="text"
            id="number"
            className="form-input"
            placeholder="Enter your phone number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            id="password"
            className="form-input"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="role" className="form-label">Role</label>
          <select
            id="role"
            className="form-select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <div className="form-actions">
          <button className="form-submit" onClick={handleSignup}>
            Sign Up
          </button>
        </div>
      </div>

      <div className="additional-options">
        <p>
          Already have an account?{" "}
          <span className="link-text" onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
      </div>

      <div className="signup-footer">
        <p className="footer-text">
          By signing up, you agree to our{" "}
          <span className="link-text">Terms of Service</span> and{" "}
          <span className="link-text">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
};

export default Signup;
