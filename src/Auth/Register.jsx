import React, { useState, useEffect } from 'react';
import './Auth.css';
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

const API_BASE = "http://localhost:5001";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home"); // Redirect to home if already logged in
    }
  }, [navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password || !confirmPassword) {
      toast.error("❌ All fields are required");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast.error("❌ Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      console.log("Sending Register Request:", { email, password });

      const response = await fetch(`${API_BASE}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Register Response:", data);

      if (!response.ok || !data.token) {
        throw new Error(data.error || "Registration Failed ❌");
      }

      toast.success("✅ Registration Successful");

      // Store token and role in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      // Redirect based on role
      if (data.role === "user") {
        navigate("/home");
      } else if (data.role === "driver") {
        navigate("/driver");
      } else {
        navigate("/admin");
      }

      window.dispatchEvent(new Event("storage"));
    } catch (error) {
      toast.error(error.message || "Registration failed");
      console.error("Registration Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register">
        <div className="form-login">
          <form className="form-block" autoComplete="off" onSubmit={handleRegister}>
            <h5 className="titilereg">
              Sign Up <br />
              <span className="actext">Create your account</span>
            </h5>

            <input
              className="form-item"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="off"
            />

            <input
              className="form-item"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />

            <input
              className="form-item"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
            />

            <button type="submit" className="sub" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>

            <div>
              <Toaster position="top-right" reverseOrder={false} color="#fff" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
