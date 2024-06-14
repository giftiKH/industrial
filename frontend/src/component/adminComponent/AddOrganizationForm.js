import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import OrganizationContext from "../../context/OrganizationContext";
import { TextField, Button, Select, MenuItem } from "@mui/material";
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
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="Fax"
          value={fax}
          onChange={(e) => setFax(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <Select
          fullWidth
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        >
          {typeOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
        <div>
          <Button type="submit" variant="contained" color="primary">
            Add
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddOrganizationForm;
