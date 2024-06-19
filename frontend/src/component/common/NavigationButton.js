import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NavigationButton = ({ buttonText, route }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(route); // Navigate to the specified route
  };

  return (
    <Button
      variant="contained"
      style={{
        float: "right",
        marginTop: 10,
        marginRight: 10,
        backgroundColor: "#07375c",
        color: "#ffffff",
      }}
      onClick={handleClick}
    >
      {buttonText}
    </Button>
  );
};

export default NavigationButton;
