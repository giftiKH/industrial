import React, { useEffect, useState } from "react";
import userServices from "../../api/userServices"; // Adjust path as necessary
import tokenDecoder from "../../utils/tokenDecoder";
import { Typography, CircularProgress, Grid, Paper } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme"; // Import your custom theme

function BasicInfo() {
  const [userData, setUserData] = useState(null);

  // Decode the token to get the user ID
  const decodedToken = tokenDecoder();
  const userId = decodedToken.userId;

  useEffect(() => {
    // Fetch user data when component mounts
    const fetchUserData = async () => {
      try {
        const user = await userServices.getUserById(userId);
        setUserData(user);
        console.log("Fetched user data:", user); // Console log the fetched user data
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  if (!userData) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Paper
        style={{
          padding: theme.spacing(3),
          margin: theme.spacing(2),
          maxWidth: 600,
          width: "100%",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" color="primary" gutterBottom>
              User Information
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="text.primary">
              User ID: {userData.user._id}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="text.primary">
              Full Name: {userData.user.full_name}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="text.primary">
              Email: {userData.user.email}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="text.primary">
              Phone: {userData.user.phone}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="text.primary">
              Role: {userData.user.role}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="text.primary">
              Organization: {userData.user.organization.name}
            </Typography>
          </Grid>
          {/* Add more user details as needed */}
        </Grid>
      </Paper>
    </ThemeProvider>
  );
}

export default BasicInfo;
