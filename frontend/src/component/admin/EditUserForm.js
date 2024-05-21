import React, { useState, useEffect } from "react";
import { TextField, Button, MenuItem } from "@mui/material";
import axios from "axios";
import { fetchOrganizations } from "../../data/organizationService";

const EditUserForm = ({ user, onSave }) => {
  const [formData, setFormData] = useState({
    full_name: user ? user.full_name : "",
    email: user ? user.email : "",
    password: "",
    phone: user ? user.phone : "",
    role: user ? user.role : "",
    organization: user ? user.organization._id : "",
  });

  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    const loadOrganizations = async () => {
      try {
        const orgs = await fetchOrganizations();
        setOrganizations(orgs);
      } catch (error) {
        console.error("Error loading organizations:", error);
      }
    };

    loadOrganizations();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/users/${user._id}`,
        formData
      );

      if (response.data.success) {
        alert("User updated successfully");
        onSave();
      }
    } catch (error) {
      alert(`Error: ${error.response.data.error}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Full Name"
        name="full_name"
        value={formData.full_name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        type="password"
        label="Password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        select
        label="Role"
        name="role"
        value={formData.role}
        onChange={handleChange}
        fullWidth
        margin="normal"
      >
        <MenuItem value="super-admin">Super Admin</MenuItem>
        <MenuItem value="AACEB-staff">AACEB Staff</MenuItem>
        <MenuItem value="admin">Admin</MenuItem>
        <MenuItem value="sub-city-staff">Sub City Staff</MenuItem>
        <MenuItem value="school-admin">School Admin</MenuItem>
      </TextField>
      <TextField
        select
        label="Organization"
        name="organization"
        value={formData.organization}
        onChange={handleChange}
        fullWidth
        margin="normal"
      >
        {organizations.map((org) => (
          <MenuItem key={org._id} value={org._id}>
            {org.name}
          </MenuItem>
        ))}
      </TextField>
      <Button type="submit" variant="contained" color="primary">
        Save
      </Button>
    </form>
  );
};

export default EditUserForm;
