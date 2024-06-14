import React, { useContext, useState } from "react";
import TextbookContext from "../../context/TextbookContext";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  Box,
  Typography,
  InputLabel,
  Snackbar,
} from "@mui/material";

const AddTB = () => {
  const { createTextbook } = useContext(TextbookContext);

  const [grade, setGrade] = useState("");
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [language, setLanguage] = useState("");
  const [category, setCategory] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (event) => {
    switch (event.target.name) {
      case "grade":
        setGrade(event.target.value);
        break;
      case "title":
        setTitle(event.target.value);
        break;
      case "subject":
        setSubject(event.target.value);
        break;
      case "language":
        setLanguage(event.target.value);
        break;
      case "category":
        setCategory(event.target.value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newTextbook = {
        grade,
        title,
        subject,
        language,
        category,
      };
      await createTextbook(newTextbook);
      setSuccessMessage("Textbook successfully added!");
      setOpenSnackbar(true);
      setGrade("");
      setTitle("");
      setSubject("");
      setLanguage("");
      setCategory("");
    } catch (error) {
      console.error("Error adding textbook:", error);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Typography variant="h6" gutterBottom>
        Add New Textbook
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          required
          name="grade"
          label="Grade"
          value={grade}
          onChange={handleChange}
          type="number"
          inputProps={{ min: 1, max: 12 }}
        />
        <TextField
          fullWidth
          required
          name="title"
          label="Title"
          value={title}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          required
          name="subject"
          label="Subject"
          value={subject}
          onChange={handleChange}
        />
        <InputLabel htmlFor="language">Language</InputLabel>
        <Select
          fullWidth
          required
          name="language"
          value={language}
          onChange={handleChange}
          inputProps={{ id: "language" }}
        >
          <MenuItem value="amharic">Amharic</MenuItem>
          <MenuItem value="english">English</MenuItem>
          <MenuItem value="afaan oromo">Afaan Oromo</MenuItem>
        </Select>
        <InputLabel htmlFor="category">Category</InputLabel>
        <Select
          fullWidth
          required
          name="category"
          value={category}
          onChange={handleChange}
          inputProps={{ id: "category" }}
        >
          <MenuItem value="teacher guide">Teacher Guide</MenuItem>
          <MenuItem value="student textbook">Student Textbook</MenuItem>
        </Select>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Add Textbook
        </Button>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={successMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      />
    </Box>
  );
};

export default AddTB;
