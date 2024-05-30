import React from "react";

const ButtonComponent = ({ name, onClick, style }) => {
  return <button onClick={onClick} style={style}>{name}</button>;
};

export default ButtonComponent;
