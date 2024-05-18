// ContactPage.js
import React from "react";
import Header from "../component/Header";

const ContactPage = () => {
  return (
    <>
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(100vh - 60px)", // Adjusted height to accommodate the header (64px is the typical height of a Material-UI AppBar)
          backgroundColor: "#e3e2e3",
        }}
      >
        <div>
          <h1>Contact Us</h1>
          <p>
            Please feel free to contact us using the information below. We're
            happy to hear from you!
          </p>
          <ul>
            <li>Email: contact@example.com</li>
            <li>Phone: +1-123-456-7890</li>
            <li>Address: 123 Main Street, City, Country</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
