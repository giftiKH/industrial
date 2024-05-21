// organizationService.js

import axios from "axios";

export const fetchOrganizations = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/org/organizations"
    );
    if (response.data.success) {
      return response.data.organizations;
    }
  } catch (error) {
    console.error("Error fetching organizations:", error);
    throw error;
  }
};
