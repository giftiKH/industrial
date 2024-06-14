// typeOptionsConfig.js
import tokenDecoder from "./tokenDecoder";

// Function to get user role, organizationId, and userId from decoded token
const getUserInfo = () => {
  const userInfo = tokenDecoder();
  if (userInfo && userInfo.role) {
    return {
      role: userInfo.role,
      organizationId: userInfo.organizationId,
      userId: userInfo.userId,
    };
  } else {
    console.warn("User is not logged in or role information is missing");
    return {
      role: null,
      organizationId: null,
      userId: null,
    };
  }
};

// Define roleTypeOptions based on user role
const getRoleTypeOptions = () => {
  const { role } = getUserInfo();

  const roleTypeOptions = {
    admin: ["private-school", "public-school"],
    "super-admin": ["sub-city"],
  };

   return roleTypeOptions[role] || [];

};

export default getRoleTypeOptions();
