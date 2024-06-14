// src/utils/tokenDecoder.js
export default function tokenDecoder() {
  try {
    // Get the token from localStorage
    const token = localStorage.getItem("token");

    // If token does not exist, return null
    if (!token) return null;

    // Split the token into its three parts: header, payload, and signature
    const [, payload] = token.split(".");

    // Decode the payload using base64 encoding
    const decodedPayload = atob(payload);

    // Parse the decoded payload as JSON to get the user data
    const userData = JSON.parse(decodedPayload);

    // Return the user data
    return userData;
  } catch (error) {
    console.error("Error decoding token:", error);
    throw new Error("Failed to decode token");
  }
}
