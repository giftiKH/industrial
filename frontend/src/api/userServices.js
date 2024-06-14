import axios from "axios";

const API_URL = "http://localhost:5000/api/users"; // Adjust URL based on your backend API endpoint

const userServices = {
  // User authentication
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      const { token } = response.data;

      if (!token) {
        throw new Error("Token not received from server.");
      }

      localStorage.setItem("token", token);
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error.response?.data || error.message; // Throw the actual error response or message
    }
  },

  logout: async () => {
    try {
      // Clear token from localStorage
      localStorage.removeItem("token");

      const response = await axios.post(`${API_URL}/logout`);
      return response.data;
    } catch (error) {
      console.error("Logout error:", error);
      throw error.response?.data || error.message; // Throw the actual error response or message
    }
  },

  // User management
  addUser: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/add`, userData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  editUser: async (id, userData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, userData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  deleteUser: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getAllUsers: async () => {
    try {
      const response = await axios.get(`${API_URL}/all-users`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getUserById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getUsersByOrganization: async (organizationId) => {
    try {
      const response = await axios.get(`${API_URL}/${organizationId}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getUsersByRole: async (role) => {
    try {
      const response = await axios.get(`${API_URL}/${role}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};

export default userServices;
