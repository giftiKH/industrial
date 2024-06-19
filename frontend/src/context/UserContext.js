import React, { createContext, useState, useEffect } from "react";
import userServices from "../api/userServices";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const data = await userServices.getAllUsers();
        console.log("Fetched users at context:", data);
        if (Array.isArray(data.users)) {
          setUsers(data.users);
        } else {
          throw new Error("Unexpected data format");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllUsers();
  }, []);

  const addUser = async (userData) => {
    try {
      const newUser = await userServices.addUser(userData);
      setUsers([...users, newUser]);
    } catch (err) {
      setError(err.message);
    }
  };

  const editUser = async (id, userData) => {
    try {
      const updatedUser = await userServices.editUser(id, userData);
      setUsers(
        users.map((user) =>
          user._id === id ? { ...user, ...updatedUser } : user
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteUser = async (id) => {
    try {
      await userServices.deleteUser(id);
      setUsers(users.filter((user) => user._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const getUserById = async (id) => {
    try {
      return await userServices.getUserById(id);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const getUsersByOrganization = async (organizationId) => {
    try {
      return await userServices.getUsersByOrganization(organizationId);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const getUsersByRole = async (role) => {
    try {
      return await userServices.getUsersByRole(role);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  

  return (
    <UserContext.Provider
      value={{
        users,
        loading,
        error,
        addUser,
        editUser,
        deleteUser,
        getUserById,
        getUsersByOrganization,
        getUsersByRole,
        
      }}
    >
      {loading ? <div>Loading...</div> : children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => React.useContext(UserContext);

export default UserContext;
