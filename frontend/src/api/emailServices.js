// api/emailServices.js

import axios from "axios";

const sendEmail = async (emailData) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/emails/send-email",
      emailData
    );
    return response.data; // Assuming the backend sends back a success message
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export { sendEmail };
