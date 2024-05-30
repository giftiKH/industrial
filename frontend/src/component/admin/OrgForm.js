import React, { useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";

const OrgForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [fax, setFax] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");

  const handleSubmit = async () => {
    try {
      const newOrg = {
        name,
        email,
        phone,
        fax,
        location,
        type,
      };

      const response = await axios.post(
        "http://localhost:5000/api/org/add",
        newOrg
      );

      if (response.data.success) {
        console.log(
          "Organization added successfully:",
          response.data.organization
        );
        setName("");
        setEmail("");
        setPhone("");
        setFax("");
        setLocation("");
        setType("");
      } else {
        console.error("Error adding organization:", response.data.error);
      }
    } catch (error) {
      console.error("Error adding organization:", error.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Add New Organization</h1>
      <form noValidate autoComplete="off">
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Fax"
          value={fax}
          onChange={(e) => setFax(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Type</InputLabel>
          <Select value={type} onChange={(e) => setType(e.target.value)}>
            <MenuItem value="AACEB">AACEB</MenuItem>
            <MenuItem value="sub-city">sub-city</MenuItem>
            <MenuItem value="private-school">private-school</MenuItem>
            <MenuItem value="public-school">public-school</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          style={{ marginTop: "20px" }}
        >
          Add Organization
        </Button>
      </form>
    </div>
  );
};

export default OrgForm;
