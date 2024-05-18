// AboutPage.js
import React from "react";
import Header from "../component/Header";

const AboutPage = () => {
  return (
    <>
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(100vh - 64px)", // Adjusted height to accommodate the header (64px is the typical height of a Material-UI AppBar)
          paddingTop: "10px", // Added padding to reduce space between header and content
          backgroundColor: "#e3e2e3",
        }}
      >
        <div
          style={{
            textAlign: "center", // Center align the content inside the div
            maxWidth: "600px", // Optionally set a maximum width for the content
          }}
        >
          <h1>About Us</h1>
          <p>
            We are a team of passionate individuals dedicated to creating
            innovative solutions that make a difference. Our mission is to
            empower people and businesses through technology.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            dapibus enim nec quam vestibulum, sit amet hendrerit libero lacinia.
            Mauris lobortis consectetur nisi, sit amet facilisis justo eleifend
            nec. Quisque sagittis velit at eros efficitur condimentum.
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
