// src/components/common/BasicInfo.js
import React from "react";
import tokenDecoder from "../../utils/tokenDecoder";

function BasicInfo() {
  // Decode the token to get the user data
  const userData = tokenDecoder();

  return (
    <div>
      {userData ? (
        <div>
          <h2>User Information</h2>
          <p>User ID: {userData.userId}</p>
          <p>Role: {userData.role}</p>
          <p>Organization ID: {userData.organizationId}</p> 
        </div>
      ) : (
        <p>No user data found</p>
      )}
    </div>
  );
}

export default BasicInfo;
