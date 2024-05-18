// HomePage.js
import React from "react";
import { useUserInfo } from "../utils/authUtils"; // Import useUserInfo hook

const HomePage = () => {
  
  // Use the useUserInfo hook to retrieve user information
  const userInfo = useUserInfo();

  return (
    <div>
      
      <h1>Welcome to HomePage</h1>
      {userInfo ? (
        <div>
          <p>User ID: {userInfo.userId}</p>
          <p>Role: {userInfo.role}</p>
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
};

export default HomePage;
