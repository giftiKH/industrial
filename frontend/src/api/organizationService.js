import axios from "axios";

const BASE_URL = "http://localhost:5000/api/org";

export const addOrganization = async (organizationData) => {
  try {
    const response = await axios.post(`${BASE_URL}/add`, organizationData);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || "Failed to add organization"
    );
  }
};

export const editOrganization = async (organizationId, organizationData) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/${organizationId}`,
      organizationData
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || "Failed to edit organization"
    );
  }
};

export const deleteOrganization = async (organizationId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${organizationId}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || "Failed to delete organization"
    );
  }
};



export const getAllOrganizations = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/organizations`);
    console.log("Fetched Organizations at service:", response.data); // Log the response data
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching organizations:",
      error.response?.data?.error || error.message
    ); // Log any errors
    throw new Error(
      error.response?.data?.error || "Failed to fetch organizations"
    );
  }
};


export const getOrganizationsByType = async (type) => {
  try {
    const response = await axios.get(`${BASE_URL}/type/${type}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || "Failed to fetch organizations by type"
    );
  }
};

export const getOrganizationsByParent = async (parentId) => {
  try {
    const response = await axios.get(`${BASE_URL}/parent/${parentId}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || "Failed to fetch organizations by parent"
    );
  }
};
