import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import OrganizationContext from "../../context/OrganizationContext";
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
import typeOptions from "../../utils/typeOptionsConfig";
import tokenDecoder from "../../utils/tokenDecoder";

const AddOrganizationForm = () => {
  const { createOrganization } = useContext(OrganizationContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [fax, setFax] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [error, setError] = useState("");

  const userInfo = tokenDecoder();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const organizationData = {
        name,
        email,
        phone,
        fax,
        location,
        type,
        parent: userInfo.organizationId, // Hardcoded parent value
        created_by: userInfo.userId, // Hardcoded created_by value
      };
      await createOrganization(organizationData);
      // Navigate to the organization list page on successful creation
      navigate("/organizations");
    } catch (err) {
      setError(err.message);
    }
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
          Add Organization
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
              <TextField
                fullWidth
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                sx={{ maxWidth: "100%" }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                sx={{ maxWidth: "100%" }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                sx={{ maxWidth: "100%" }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Fax"
                value={fax}
                onChange={(e) => setFax(e.target.value)}
                required
                sx={{ maxWidth: "100%" }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                sx={{ maxWidth: "100%" }}
              />
            </Grid>
            <Grid item xs={6}>
              <Select
                fullWidth
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
                displayEmpty
                sx={{ maxWidth: "100%" }}
              >
                <MenuItem value="" disabled>
                  Select Type
                </MenuItem>
                {typeOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
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
              Add
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddOrganizationForm;
