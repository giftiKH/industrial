import React, { createContext, useContext, useState, useEffect } from "react";
import {
  createTextbookRequest,
  getAllTextbookRequests,
  getTextbookRequestById,
  updateTextbookRequest,
  updateSingleTextbook,
  deleteSingleTextbook,
  deleteTextbookRequest,
  updateTextbookRequestEvaluation,
  getAllTextbookRequestsByYear,
  submitTextbookRequest,
} from "../api/requestServices";

// Create context object
const TextbookRequestContext = createContext();

// Custom hook to use the context
export const useTextbookRequestContext = () => {
  return useContext(TextbookRequestContext);
};

// Context Provider component
export const TextbookRequestProvider = ({ children }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all textbook requests
  const fetchAllTextbookRequests = async () => {
    try {
      setLoading(true);
      const data = await getAllTextbookRequests();
      setRequests(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Fetch textbook requests on component mount
  useEffect(() => {
    fetchAllTextbookRequests();
  }, []);

  
  // Fetch textbook request by ID
  const getTextbookRequest = async (id) => {
    try {
      setLoading(true);
      const data = await getTextbookRequestById(id);
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err; // Rethrow to be caught by caller
    }
  };

  // Expose context values
  const contextValues = {
    requests,
    loading,
    error,
    createTextbookRequest: async (textbooks, userID) => {
      try {
        const data = await createTextbookRequest(textbooks, userID);
        fetchAllTextbookRequests(); // Refresh the list after creating a new request
        return data;
      } catch (err) {
        throw err; // Rethrow to be caught by caller
      }
    },
    updateTextbookRequest: async (id, updatedRequest) => {
      try {
        const data = await updateTextbookRequest(id, updatedRequest);
        fetchAllTextbookRequests(); // Refresh the list after updating a request
        return data;
      } catch (err) {
        throw err; // Rethrow to be caught by caller
      }
    },
    updateSingleTextbook: async (requestId, textbookId, updatedTextbook) => {
      try {
        const data = await updateSingleTextbook(
          requestId,
          textbookId,
          updatedTextbook
        );
        fetchAllTextbookRequests(); // Refresh the list after updating a textbook
        return data;
      } catch (err) {
        throw err; // Rethrow to be caught by caller
      }
    },

    deleteSingleTextbook: async (requestId, textbookId) => {
      try {
        console.log(
          `Deleting textbook with ID ${textbookId} from request ID ${requestId}`
        );
        const data = await deleteSingleTextbook(requestId, textbookId);
        fetchAllTextbookRequests(); // Refresh the list after deleting a textbook
        console.log(`Deleted textbook with ID ${textbookId} successfully`);
        return data;
      } catch (err) {
        console.error(
          `Error deleting textbook with ID ${textbookId}:`,
          err.message
        );
        throw err; // Rethrow to be caught by caller
      }
    },
    deleteTextbookRequest: async (id) => {
      try {
        const data = await deleteTextbookRequest(id);
        fetchAllTextbookRequests(); // Refresh the list after deleting a request
        return data;
      } catch (err) {
        throw err; // Rethrow to be caught by caller
      }
    },
    updateTextbookRequestEvaluation: async (id, evaluationData) => {
      try {
        const data = await updateTextbookRequestEvaluation(id, evaluationData);
        fetchAllTextbookRequests(); // Refresh the list after updating evaluation
        return data;
      } catch (err) {
        throw err; // Rethrow to be caught by caller
      }
    },
    getAllTextbookRequestsByYear: async (year) => {
      try {
        const data = await getAllTextbookRequestsByYear(year);
        return data;
      } catch (err) {
        throw err; // Rethrow to be caught by caller
      }
    },
    submitTextbookRequest: async (id) => {
      try {
        const data = await submitTextbookRequest(id);
        fetchAllTextbookRequests(); // Refresh the list after submitting a request
        return data;
      } catch (err) {
        throw err; // Rethrow to be caught by caller
      }
    },
    getTextbookRequest, // Include getTextbookRequest function
  };

  // Provide the context values to the entire application
  return (
    <TextbookRequestContext.Provider value={contextValues}>
      {children}
    </TextbookRequestContext.Provider>
  );
};
