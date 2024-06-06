// src/components/RequestDetails.js
import React, { useEffect } from "react";

const RequestDetails = ({ requestId, setRequest, request }) => {
  useEffect(() => {
    // Fetch the request details from the server if not provided
    if (!request) {
      const fetchRequest = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/api/textbookRequests/${requestId}`
          );
          const data = await response.json();
          setRequest(data);
        } catch (error) {
          console.error("Error fetching request details:", error);
        }
      };
      fetchRequest();
    }
  }, [requestId, setRequest, request]);

  if (!request) return null;

  return (
    <div>
      <h2>Request Details</h2>
      <p>ID: {request._id}</p>
      {/* Display other request details here */}
    </div>
  );
};

export default RequestDetails;
