// LoginPage.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../component/Header";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        data
      );
      const { token } = response.data;
      localStorage.setItem("token", token); // Store token in localStorage
      console.log("Login successful:", response.data);
      navigate("/dashboard");
      // Handle successful login, e.g., save token, redirect, etc.
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Failed to login. Please check your credentials and try again.");
    }
  };

  return (
    <>
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(100vh - 64px)", // Adjusted height to accommodate the header (64px is the typical height of a Material-UI AppBar)
          padding: "20px",
          backgroundColor: "#e3e2e3",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            maxWidth: "400px",
            width: "100%",
            padding: "20px",
            borderRadius: "10px",
            backgroundColor: "#ffffff", // Background color matching the header logo
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Box shadow for the card effect
          }}
        >
          <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h1>
          {error && (
            <div style={{ color: "red", marginBottom: "20px" }}>{error}</div>
          )}
          <div style={{ marginBottom: "20px" }}>
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "calc(100% - 20px)",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc", // Added border to match the card border
              }}
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "calc(100% - 20px)",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc", // Added border to match the card border
              }}
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "10px",
                backgroundColor: "#07375c", // Background color matching the header menu
                color: "#ffffff", // Text color matching the header menu
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Login
            </button>
          </div>
          <div style={{ textAlign: "center" }}>
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
