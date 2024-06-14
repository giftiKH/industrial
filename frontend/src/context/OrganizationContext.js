import React, { createContext, useState, useEffect } from "react";
import {
  addOrganization,
  editOrganization,
  deleteOrganization,
  getAllOrganizations,
} from "../api/organizationService";

const OrganizationContext = createContext();

export const OrganizationProvider = ({ children }) => {
  const [organizations, setOrganizations] = useState({
    organizations: [],
    success: false,
  });
  const [error, setError] = useState("");

  const fetchAllOrganizations = async () => {
    try {
      const data = await getAllOrganizations();
      setOrganizations({
        organizations: data.organizations,
        success: data.success,
      });
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchAllOrganizations();
  }, []);

  const createOrganization = async (organizationData) => {
    try {
      const newOrganization = await addOrganization(organizationData);
      setOrganizations((prevOrganizations) => ({
        ...prevOrganizations,
        organizations: [...prevOrganizations.organizations, newOrganization],
      }));
    } catch (err) {
      setError(err.message);
    }
  };

   const updateOrganization = async (organizationId, updatedData) => {
     try {
       const updatedOrganization = await editOrganization(
         organizationId,
         updatedData
       );

       // Update organizations state in context
       setOrganizations((prevOrganizations) => {
         const updatedOrganizations = prevOrganizations.organizations.map(
           (org) =>
             org._id === organizationId ? updatedOrganization.organization : org
         );
         return {
           ...prevOrganizations,
           organizations: updatedOrganizations,
         };
       });

       return { success: true, organization: updatedOrganization };
     } catch (error) {
       console.error("Error updating organization:", error);
       return { success: false, error: error.message };
     }
   };


  const removeOrganization = async (id) => {
    try {
      await deleteOrganization(id);
      setOrganizations((prevOrganizations) => ({
        ...prevOrganizations,
        organizations: prevOrganizations.organizations.filter(
          (organization) => organization._id !== id
        ),
      }));
    } catch (err) {
      setError(err.message);
    }
  };

  const getOrganizationById = async (id) => {
    try {
      return organizations.organizations.find((org) => org._id === id);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return (
    <OrganizationContext.Provider
      value={{
        organizations,
        error,
        createOrganization,
        updateOrganization,
        removeOrganization,
        getOrganizationById,
      }}
    >
      {children}
    </OrganizationContext.Provider>
  );
};

export default OrganizationContext;
