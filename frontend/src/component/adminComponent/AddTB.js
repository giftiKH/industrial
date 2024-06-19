import React, { useContext, useState } from "react";
import TextbookContext from "../../context/TextbookContext";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  Box,
  Typography,
  Snackbar,
  FormControl,
  InputLabel,
  Grid,
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
    <Box
      sx={{
        maxWidth: 600,
        margin: "auto",
        textAlign: "center",
        bgcolor: "#f0f0f0",
        boxShadow: 1,
        p: 3,
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        Add New Textbook
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                required
                name="grade"
                label="Grade"
                value={grade}
                onChange={handleChange}
                type="number"
                inputProps={{ min: 1, max: 12 }}
                sx={{ height: 55 }} // Decrease height of TextField
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                required
                name="title"
                label="Title"
                value={title}
                onChange={handleChange}
                sx={{ height: 55 }} // Decrease height of TextField
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                required
                name="subject"
                label="Subject"
                value={subject}
                onChange={handleChange}
                sx={{ height: 55 }} // Decrease height of TextField
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel htmlFor="language">Language</InputLabel>
              <Select
                required
                name="language"
                value={language}
                onChange={handleChange}
                inputProps={{ id: "language" }}
                sx={{ height: 55 }} // Decrease height of Select
              >
                <MenuItem value="amharic">Amharic</MenuItem>
                <MenuItem value="english">English</MenuItem>
                <MenuItem value="afaan oromo">Afaan Oromo</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel htmlFor="category">Category</InputLabel>
              <Select
                required
                name="category"
                value={category}
                onChange={handleChange}
                inputProps={{ id: "category" }}
                sx={{ height: 55 }} // Decrease height of Select
              >
                <MenuItem value="teacher guide">Teacher Guide</MenuItem>
                <MenuItem value="student textbook">Student Textbook</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          sx={{
            mt: 3,
            width: "50%",
            bgcolor: "#07375c",
            color: "#ffffff",
            mx: "auto",
          }}
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
