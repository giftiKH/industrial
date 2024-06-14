import { useContext, useState, useEffect } from "react";
import OrganizationContext from "../context/OrganizationContext";

const useOrganizationRoleSelection = (
  initialOrganizationId = "",
  initialRole = ""
) => {
  const { organizations, getOrganizationById } =
    useContext(OrganizationContext);
  const [selectedOrganizationId, setSelectedOrganizationId] = useState(
    initialOrganizationId
  );
  const [selectedRole, setSelectedRole] = useState(initialRole);
  const [organizationType, setOrganizationType] = useState("");
  const [filteredRoles, setFilteredRoles] = useState([]);

  useEffect(() => {
    const fetchOrganizationDetails = async () => {
      try {
        const organization = await getOrganizationById(selectedOrganizationId);
        if (organization && organization.type) {
          setOrganizationType(organization.type);
          setFilteredRoles(getFilteredRoles(organization.type));
          // Ensure selectedRole is set based on current user's role or default
          if (organization.roles.includes(selectedRole)) {
            setSelectedRole(selectedRole);
          } else {
            setSelectedRole("");
          }
        } else {
          setOrganizationType("");
          setFilteredRoles([]);
          setSelectedRole("");
        }
      } catch (error) {
        console.error("Error fetching organization details:", error);
      }
    };

    if (selectedOrganizationId) {
      fetchOrganizationDetails();
    } else {
      setOrganizationType("");
      setFilteredRoles([]);
      setSelectedRole("");
    }
  }, [selectedOrganizationId, selectedRole, getOrganizationById]);

  const handleOrganizationChange = (orgId) => {
    setSelectedOrganizationId(orgId);
    setSelectedRole(""); // Reset selected role when organization changes
  };

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    console.log("Selected Role:", role);
  };

  const getFilteredRoles = (type) => {
    switch (type) {
      case "AACEB":
        return ["super-admin", "AACEB-staff"];
      case "sub-city":
        return ["admin", "sub-city-staff"];
      case "private-school":
        return ["private-school-admin"];
      case "public-school":
        return ["public-school-admin"];
      default:
        return [];
    }
  };

  return {
    selectedOrganizationId,
    selectedRole,
    organizationType,
    filteredRoles,
    organizations: organizations.organizations.map((org) => ({
      value: org._id,
      label: org.name,
      roles: org.roles, // Include roles in organization data
    })),
    handleOrganizationChange,
    handleRoleChange,
  };
};

export default useOrganizationRoleSelection;
