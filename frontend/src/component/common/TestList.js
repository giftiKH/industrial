// TestList.js
import React from "react";
import { useUserContext } from "../../context/UserContext";

const TestList = () => {
  const { users, loading, error } = useUserContext();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Log the type and value of users to debug
  console.log("users type:", typeof users);
  console.log("users value:", users);

  // Ensure users is an array
  if (!Array.isArray(users)) {
    return <div>Unexpected data format</div>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Full Name</th>
          <th>Email</th>
          <th>Organization</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user._id}>
            <td>{user._id}</td>
            <td>{user.full_name}</td>
            <td>{user.email}</td>
            <td>{user.organization?.name}</td>{" "}
            {/* Added optional chaining for organization */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TestList;
