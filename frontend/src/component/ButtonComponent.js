// Button.js
import React from "react";

const ButtonComponent = ({ name, onClick }) => {
  return <button onClick={onClick}>{name}</button>;
};

export default ButtonComponent;
