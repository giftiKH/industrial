// src/services/textbookService.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/textbooks/all-textbooks";

export const getAllTextbooks = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching textbooks:", error);
    throw error;
  }
};
