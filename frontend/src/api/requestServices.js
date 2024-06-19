import axios from "axios";

// Define your backend API base URL
const baseURL = "http://localhost:5000/api/textbookRequests"; // Replace with your actual backend URL

// Axios instance with baseURL configured
const axiosInstance = axios.create({
  baseURL,
});

// Function to create a new textbook request
export const createTextbookRequest = async (textbooks, userID) => {
  try {
    const response = await axiosInstance.post("/add", { textbooks, userID });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Function to get all textbook requests
export const getAllTextbookRequests = async () => {
  try {
    const response = await axiosInstance.get("/all");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Function to get a textbook request by ID
export const getTextbookRequestById = async (id) => {
  try {
    const response = await axiosInstance.get(`/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Function to update a textbook request
export const updateTextbookRequest = async (id, updatedRequest) => {
  try {
    const response = await axiosInstance.put(`/${id}`, updatedRequest);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Function to update a single textbook within a request
export const updateSingleTextbook = async (
  requestId,
  textbookId,
  updatedTextbook
) => {
  try {
    const response = await axiosInstance.put(
      `/${requestId}/textbooks/${textbookId}`,
      updatedTextbook
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Function to delete a single textbook from a request
export const deleteSingleTextbook = async (requestId, textbookId) => {
  try {
    const response = await axiosInstance.delete(
      `/${requestId}/textbooks/${textbookId}`
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Function to delete a textbook request
export const deleteTextbookRequest = async (id) => {
  try {
    const response = await axiosInstance.delete(`/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Function to update evaluation of a textbook request
export const updateTextbookRequestEvaluation = async (id, evaluationData) => {
  try {
    const response = await axiosInstance.put(
      `/evaluation/${id}`,
      evaluationData
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Function to get all textbook requests by year
export const getAllTextbookRequestsByYear = async (year) => {
  try {
    const response = await axiosInstance.get(`/year/${year}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Function to submit a textbook request
export const submitTextbookRequest = async (id) => {
  try {
    const response = await axiosInstance.put(`/${id}/submit`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

