import axios from "axios";

const BASE_URL = "http://localhost:5000/api/textbooks";

const textbookServices = {
  // Create a new textbook
  createTextbook: async (textbookData) => {
    try {
      const response = await axios.post(`${BASE_URL}/add`, textbookData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || "Error creating textbook");
    }
  },

  // Get all textbooks
  getAllTextbooks: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/all-textbooks`);
      return response.data.textbooks;
    } catch (error) {
      throw new Error(
        error.response.data.message || "Error fetching textbooks"
      );
    }
  },

  // Get a textbook by ID
  getTextbookById: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || "Error fetching textbook");
    }
  },

  // Update a textbook
  updateTextbook: async (id, textbookData) => {
    try {
      const response = await axios.put(`${BASE_URL}/${id}`, textbookData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || "Error updating textbook");
    }
  },

  // Delete a textbook
  deleteTextbook: async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || "Error deleting textbook");
    }
  },
};

export default textbookServices;
