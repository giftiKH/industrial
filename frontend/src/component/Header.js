import React from "react";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import logo from "../asset/aaceb-logo.png"; // Import your logo image

const Header = ({ isDashboard }) => {
  return (
    <>
      <AppBar position="static" style={{ backgroundColor: "#ffffff" }}>
        <Toolbar style={{ justifyContent: "center" }}>
          <div>
            <img
              src={logo}
              alt="Your Logo"
              style={{ height: "100px", marginRight: "20px" }}
            />
          </div>
        </Toolbar>

        <Toolbar
          style={{ backgroundColor: "#07375c", justifyContent: "center" }}
        >
          {!isDashboard ? (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/login"
                style={{ color: "#eceff2" }}
              >
                Login
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/contact"
                style={{ color: "#eceff2" }}
              >
                Contact
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/about"
                style={{ color: "#eceff2" }}
              >
                About Us
              </Button>
            </>
          ) : (
            <>
              <Box sx={{ flexGrow: 1 }}>
                <Button
                  color="inherit"
                  component={Link}
                  to="/dashboard"
                  style={{ color: "#eceff2", textAlign: "left" }}
                >
                  Dashboard
                </Button>
              </Box>
              <Button
                color="inherit"
                endIcon={<SettingsIcon />}
                component={Link}
                to="/settings"
                style={{ color: "#eceff2" }}
              >
                
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/login"
                style={{ color: "#eceff2" }}
              >
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
