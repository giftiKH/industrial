import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import { useEmailContext } from "../../context/EmailContext";
import useOrganizationRoleSelection from "../../hooks/useOrganizationRoleSelection";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  Box,
  Typography,
  Grid,
  Paper,
} from "@mui/material";

const AddUserForm = () => {
  const navigate = useNavigate();
  const { addUser } = useUserContext();
  const { sendEmail } = useEmailContext();

  const {
    selectedOrganizationId,
    selectedRole,
    filteredRoles,
    organizations,
    handleOrganizationChange,
    handleRoleChange,
  } = useOrganizationRoleSelection("", "");

  const [formData, setFormData] = useState({
    organization: selectedOrganizationId,
    full_name: "",
    email: "",
    phone: "",
    role: selectedRole,
    created_by: "667008f2b4a1bfc2ad802734",
    password: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newPassword = generateRandomPassword();
      setFormData((prevFormData) => ({
        ...prevFormData,
        password: newPassword,
      }));

      await addUser(formData);

      await sendEmail({
        to: formData.email,
        subject: "Your Account Details",
        text: `Username: ${formData.email}\nPassword: ${newPassword}`,
      });

      setFormData({
        organization: selectedOrganizationId,
        full_name: "",
        email: "",
        phone: "",
        role: selectedRole,
        created_by: "667008f2b4a1bfc2ad802734",
        password: "",
      });

      navigate("/users");

      alert("User added successfully!");
    } catch (error) {
      console.error("Error adding user:", error);
      setError("Failed to add user. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const generateRandomPassword = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const length = 8;
    let newPassword = "";
    for (let i = 0; i < length; i++) {
      newPassword += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return newPassword;
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh-100px"
      sx={{ marginTop: "2px" }} // Reduce space from the header
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          width: "75%", // Width of the form
          backgroundColor: "#f9f9f9", // Background color of the form
          borderRadius: 2,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Shadow for the form
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Add User
        </Typography>
        {error && (
          <Typography color="error" align="center">
            {error}
          </Typography>
        )}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Select
                fullWidth
                name="organization"
                value={selectedOrganizationId}
                onChange={(e) => {
                  handleOrganizationChange(e.target.value);
                  handleChange(e);
                }}
                required
                displayEmpty
                sx={{ maxWidth: "100%" }}
              >
                <MenuItem value="" disabled>
                  Select Organization
                </MenuItem>
                {organizations.map((org) => (
                  <MenuItem key={org.value} value={org.value}>
                    {org.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Full Name"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                required
                sx={{ maxWidth: "100%" }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                sx={{ maxWidth: "100%" }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                sx={{ maxWidth: "100%" }}
              />
            </Grid>
            <Grid item xs={6}>
              <Select
                fullWidth
                name="role"
                value={selectedRole}
                onChange={(e) => {
                  handleRoleChange(e.target.value);
                  handleChange(e);
                }}
                required
                displayEmpty
                sx={{ maxWidth: "100%" }}
              >
                <MenuItem value="" disabled>
                  Select Role
                </MenuItem>
                {filteredRoles.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="center" mt={2}>
            <Button
              type="submit"
              variant="contained"
              sx={{ backgroundColor: "#07375c", width: "150px" }}
            >
              Add User
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddUserForm;
