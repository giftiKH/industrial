import React from "react";
import Header from "../component/common/Header";
import AboutContent from "../component/common/AboutContent";

const AboutPage = () => {
  return (
    <>
      <Header type="normal" />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(100vh - 128px)", // Adjusted height to accommodate the header (64px is the typical height of a Material-UI AppBar)
          padding: "10px",
          backgroundColor: "#e3e2e3",
        }}
      >
        <AboutContent />
      </div>
    </>
  );
};

export default AboutPage;
