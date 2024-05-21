// Test.js
import React from "react";
import Button from "./ButtonComponent";

const Test = ({ handleButtonClick }) => {
  return (
    <div>
      <h1>This is the Test Component</h1>
      <Button name="Open File" onClick={() => handleButtonClick("profile")} />
    </div>
  );
};

export default Test;
