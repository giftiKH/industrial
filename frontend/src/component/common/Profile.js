import React, { useEffect, useState } from "react";
import { useUserInfo } from "../../utils/authUtils";

const Profile = () => {
  const userInfo = useUserInfo();
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async (userId) => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token available");
        }

        const response = await fetch(
          `http://localhost:5000/api/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const userData = await response.json();
        setUserProfile(userData.user); // Assuming your API returns the user data inside a "user" field
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    if (userInfo) {
      fetchUserProfile(userInfo.userId);
    }
  }, [userInfo]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      {userProfile ? (
        <>
          <p>Full Name: {userProfile.full_name}</p>
          <p>Email: {userProfile.email}</p>
          <p>Phone: {userProfile.phone}</p>
          <p>Role: {userProfile.role}</p>
          <p>Organization: {userProfile.organization.name}</p>
          {/* Render other profile data as needed */}
        </>
      ) : (
        <div>No user profile found</div>
      )}
    </div>
  );
};

export default Profile;
