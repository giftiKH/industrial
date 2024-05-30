// authUtils.js
import { useEffect, useState } from "react";

export const useUserInfo = () => {
  // State to store user information
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    console.log("useEffect in useUserInfo is running");

    // Retrieve token from localStorage
    const token = localStorage.getItem("token");
    console.log("Token:", token); // Log token to check if it's present

    // Decode the token (assuming it's a JWT token)
    if (token && !userInfo) {
      const decodedToken = decodeToken(token);
      console.log("Decoded Token:", decodedToken); // Log decoded token
      // Extract user information from decoded token
      const { userId, role, organizationId } = decodedToken;

      // Set user information to state
      setUserInfo({ userId, role, organizationId }); // Update to include organizationId
    }
  }, [userInfo]); // Dependency array includes userInfo

  return userInfo;
};

const decodeToken = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};
