// src/components/AddTB.js
import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const API_URL = "http://localhost:5000/api/textbooks/add";

const AddTB = () => {
  const [formValues, setFormValues] = useState({
    grade: "",
    title: "",
    subject: "",
    language: "",
    category: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, formValues);
      // Clear form fields after successful submission
      setFormValues({
        grade: "",
        title: "",
        subject: "",
        language: "",
        category: "",
      });
    } catch (err) {
      console.error("Failed to add textbook:", err);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Add New Textbook
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Grade"
            name="grade"
            value={formValues.grade}
            onChange={handleInputChange}
            fullWidth
            required
          />
          <TextField
            label="Title"
            name="title"
            value={formValues.title}
            onChange={handleInputChange}
            fullWidth
            required
          />
          <TextField
            label="Subject"
            name="subject"
            value={formValues.subject}
            onChange={handleInputChange}
            fullWidth
            required
          />
          <FormControl fullWidth required>
            <InputLabel>Language</InputLabel>
            <Select
              value={formValues.language}
              onChange={handleInputChange}
              name="language"
            >
              <MenuItem value="amharic">Amharic</MenuItem>
              <MenuItem value="english">English</MenuItem>
              <MenuItem value="afaan oromo">Afaan Oromo</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth required>
            <InputLabel>Category</InputLabel>
            <Select
              value={formValues.category}
              onChange={handleInputChange}
              name="category"
            >
              <MenuItem value="teacher guide">Teacher Guide</MenuItem>
              <MenuItem value="student textbook">Student Textbook</MenuItem>
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" color="primary">
            Add Textbook
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default AddTB;
