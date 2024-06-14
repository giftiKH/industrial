import React, { useState } from "react";
import Header from "../component/common/Header";
import LoginForm from "../component/common/LoginForm";
import { Box, Typography } from "@mui/material";
import { AuthProvider } from "../context/AuthContext";
 // Import loginUser function from userService

const LoginPage = () => {
  const [error, setError] = useState("");

  return (
    <>
      <Header type="normal" />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(100vh - 164px)",
          padding: "10px",
          backgroundColor: "#e3e2e3",
        }}
      >
        <AuthProvider>
          <LoginForm setError={setError} />
        </AuthProvider>

        {error && (
          <Typography
            variant="body1"
            color="error"
            sx={{ marginTop: "20px", textAlign: "center" }}
          >
            {error}
          </Typography>
        )}
      </Box>
    </>
  );
};

export default LoginPage;
