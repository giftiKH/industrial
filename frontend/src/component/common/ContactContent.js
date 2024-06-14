import React from "react";
import { Typography, Paper } from "@mui/material";

const ContactContent = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        textAlign: "center",
        maxWidth: "600px",
        width: "100%",
        padding: "20px",
        borderRadius: "10px",
        backgroundColor: "#ffffff",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Contact Us
      </Typography>
      <Typography variant="body1" paragraph>
        For inquiries, support, or feedback, please contact us using the
        information below:
      </Typography>
      <Typography variant="body1">
        Email: contact@example.com
        <br />
        Phone: +1234567890
        <br />
        Address: 123 Main Street, City, Country
      </Typography>
    </Paper>
  );
};

export default ContactContent;
