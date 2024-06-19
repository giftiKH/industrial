import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext"; // Adjust path as necessary
import logo from "../../asset/aaceb-logo.png";

const Header = ({ type }) => {
  const theme = useTheme();
  const { logout } = useAuthContext(); // Use the logout function from AuthContext

  const handleLogout = async () => {
    try {
      await logout();
      // Navigate to the login page or perform any other action after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AppBar position="static" style={{ margin: 0 }}>
      <Toolbar
        style={{
          flexDirection: "column",
          alignItems: "center",
          padding: 0,
        }}
      >
        <Box
          sx={{
            width: "100%",
            backgroundColor: "#FFFFFF",
            textAlign: "center",
            padding: "8px 0",
          }}
        >
          <img
            src={logo}
            alt="Logo"
            style={{ height: 60 }} // Increased the logo size
          />
        </Box>
        {type === "dashboard" ? (
          <Box
            sx={{
              width: "100%",
              backgroundColor: "#07375c", // Changed to #07375c for Dashboard color
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "8px 0",
            }}
          >
            <Typography variant="h6" component="div" sx={{ color: "#fff" }}>
              Dashboard
            </Typography>
            <Box
              sx={{
                marginLeft: "auto",
                display: "flex",
                padding: "0 16px",
              }}
            >
              <Button color="inherit">Settings</Button>
              <Button
                color="inherit"
                onClick={handleLogout}
                component={Link}
                to="/"
              >
                Logout
              </Button>
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              width: "100%",
              backgroundColor: theme.palette.primary.main,
              display: "flex",
              justifyContent: "center",
              padding: "8px 0",
            }}
          >
            <Button color="inherit" component={Link} to="/">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/contact">
              Contact
            </Button>
            <Button color="inherit" component={Link} to="/about">
              About Us
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
