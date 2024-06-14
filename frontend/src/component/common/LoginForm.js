import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Box, Paper } from "@mui/material";
import { useAuthContext } from "../../context/AuthContext"; // Adjust path as necessary

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear any previous errors

    try {
      await login(email, password);
      navigate("/users");
    } catch (error) {
      setError(error.message); // Set error state to display error message
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: "400px",
        width: "100%",
        padding: "20px",
        borderRadius: "10px",
        backgroundColor: "#ffffff",
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
        />
        {error && (
          <Typography
            variant="body2"
            color="error"
            align="center"
            sx={{ marginTop: 1 }}
          >
            {error}
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2 }}
        >
          Login
        </Button>
        <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
          <Link to="/forgot-password">Forgot Password?</Link>
        </Typography>
      </Box>
    </Paper>
  );
};

export default LoginForm;
