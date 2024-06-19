// context/EmailContext.js

import React, { createContext, useContext, useState } from "react";
import { sendEmail } from "../api/emailServices";

const EmailContext = createContext();

export const useEmailContext = () => useContext(EmailContext);

const EmailProvider = ({ children }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const sendEmailAction = async (emailData) => {
    try {
      setLoading(true);
      await sendEmail(emailData);
      setLoading(false);
      setError("");
      alert("Email sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
      setLoading(false);
      setError(error);
    }
  };

  return (
    <EmailContext.Provider
      value={{ sendEmail: sendEmailAction, error, loading }}
    >
      {children}
    </EmailContext.Provider>
  );
};

export default EmailProvider;
