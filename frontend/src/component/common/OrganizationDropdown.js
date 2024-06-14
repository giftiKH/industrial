import React from "react";
import useOrganizationRoleSelection from "../../hooks/useOrganizationRoleSelection";

const OrganizationDropdown = () => {
  const {
    selectedOrganizationId,
    selectedRole,
    organizationType,
    organizations,
    filteredRoles,
    handleOrganizationChange,
    handleRoleChange,
  } = useOrganizationRoleSelection();

  return (
    <div>
      <div>
        <label>Select Organization:</label>
        <select
          value={selectedOrganizationId}
          onChange={(e) => handleOrganizationChange(e.target.value)}
        >
          <option value="">Select an organization</option>
          {organizations.map((org) => (
            <option key={org.value} value={org.value}>
              {org.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Select Role:</label>
        <select
          value={selectedRole}
          onChange={(e) => handleRoleChange(e.target.value)}
          disabled={!organizationType} // Disable if no organization type selected
        >
          <option value="">Select a role</option>
          {filteredRoles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default OrganizationDropdown;
