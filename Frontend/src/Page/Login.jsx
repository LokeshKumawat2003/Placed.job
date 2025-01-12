import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../pageStyle/login.css";
import { toast } from "react-toastify";
import { useUrl } from "../context/UrlContext";

const Login = () => {
  const { url } = useUrl();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${url}/api/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        const { token, user } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("userID", user.id);
        toast("Login successful");
        navigate("/");
      } else {
        toast("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">
          Please log in to your account to continue accessing our services.
        </p>
      </div>
      <div className="login-form-container">
        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-actions">
            <input
              type="submit"
              className="form-submit"
              value={loading ? "Logging in..." : "Login"}
              disabled={loading}
            />
          </div>
        </form>
        <div className="additional-options">
          <p>
            Don't have an account?{" "}
            <span
              className="link-text"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </span>
          </p>
          <p>
            Forgot your password?{" "}
            <span
              className="link-text"
              onClick={() => navigate("/forgot-password")}
            >
              Reset Password
            </span>
          </p>
        </div>
      </div>
      <div className="login-footer">
        <p className="footer-text">
          By logging in, you agree to our{" "}
          <span className="link-text">Terms of Service</span> and{" "}
          <span className="link-text">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
};

export default Login;
