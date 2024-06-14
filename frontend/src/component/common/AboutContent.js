import React from "react";
import { Typography, Paper } from "@mui/material";

const AboutContent = () => {
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
        About Us
      </Typography>
      <Typography variant="body1" paragraph>
        We are a team of passionate individuals dedicated to creating innovative
        solutions that make a difference. Our mission is to empower people and
        businesses through technology.
      </Typography>
      <Typography variant="body1" paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dapibus
        enim nec quam vestibulum, sit amet hendrerit libero lacinia. Mauris
        lobortis consectetur nisi, sit amet facilisis justo eleifend nec.
        Quisque sagittis velit at eros efficitur condimentum.
      </Typography>
    </Paper>
  );
};

export default AboutContent;
