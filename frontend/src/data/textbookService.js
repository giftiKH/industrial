// src/data/textbookService.js
import axios from "axios";

const TB_API_URL = "http://localhost:5000/api/textbooks/";
const REQUEST_API_URL = "http://localhost:5000/api/textbookRequests/";

export const getAllTextbooks = async () => {
  try {
    const response = await axios.get(`${TB_API_URL}/all-textbooks`);
    return response.data;
  } catch (error) {
    console.error("Error fetching textbooks:", error);
    throw error;
  }
};

export const createTextbookRequest = async (requestData) => {
  try {
    const response = await axios.post(`${REQUEST_API_URL}/add`, requestData);
    return response;
  } catch (error) {
    console.error("Error creating textbook request:", error);
    throw error;
  }
};

export const updateTextbookRequest = async (requestId, updateData) => {
  try {
    const response = await axios.put(
      `${REQUEST_API_URL}${requestId}`,
      updateData
    );
    return response;
  } catch (error) {
    console.error("Error updating textbook request:", error);
    throw error;
  }
};

export const updateSingleTextbook = async (requestId, textbookId, data) => {
  try {
    const response = await axios.put(
      `${REQUEST_API_URL}/${requestId}/textbooks/${textbookId}`,
      data
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};