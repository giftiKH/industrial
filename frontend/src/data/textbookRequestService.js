// src/services/textbookRequestService.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/textbookRequests/all-request"; 

export const fetchAllTextbookRequests = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};
 