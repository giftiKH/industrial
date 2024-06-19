import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  IconButton,
  MenuItem,
  Button,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import tokenDecoder from "../../utils/tokenDecoder";
import { useTextbookRequestContext } from "../../context/TextbookRequestContext"; // Import context hook
import useAllTextbooks from "../../hooks/useAllTextbooks"; // Import hook to fetch textbooks

function CreateRequestForm() {
  const userData = tokenDecoder();
  const userID = userData.userId; // Hardcoded user ID

  // Console log the userID


  const { createTextbookRequest } = useTextbookRequestContext(); // Use context hook

  // Fetch textbooks using the custom hook
  const { textbooks: availableTextbooks, loading, error } = useAllTextbooks();


 

  const [textbooks, setTextbooks] = useState([{ textbook: "", quantity: "" }]);

  useEffect(() => {
    // If textbooks are fetched successfully, set the initial textbooks state
    if (!loading && !error && availableTextbooks.length > 0) {
      setTextbooks([{ textbook: availableTextbooks[0]._id, quantity: "" }]);
    }
  }, [loading, error, availableTextbooks]);

  const handleTextbookChange = (index, event) => {
    const newTextbooks = [...textbooks];
    newTextbooks[index] = {
      ...newTextbooks[index],
      [event.target.name]: event.target.value,
    };
    setTextbooks(newTextbooks);
  };

  const addTextbook = () => {
    // Check if the last entry is complete (both textbook and quantity are filled)
    const lastEntry = textbooks[textbooks.length - 1];
    if (lastEntry.textbook && lastEntry.quantity) {
      setTextbooks([...textbooks, { textbook: "", quantity: "" }]);
    } else {
      alert(
        "Please select a textbook and fill the quantity before adding a new entry."
      );
    }
  };

  const handleRemoveTextbook = (index) => {
    const newTextbooks = textbooks.filter((_, i) => i !== index);
    setTextbooks(newTextbooks);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Format textbooks array to match backend expectations
    const formattedTextbooks = textbooks.map((item) => ({
      textbook: item.textbook,
      quantity: parseInt(item.quantity), // Ensure quantity is parsed as integer
    }));

    

    try {
      await createTextbookRequest(formattedTextbooks, userID); // Use context function to create request
      console.log("Request created successfully");
      // Optionally, handle success (e.g., redirect to another page or show a success message)
    } catch (error) {
      console.error("Error creating request:", error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Get the list of textbooks that are not yet selected
  const availableTextbooksFiltered = availableTextbooks.filter(
    (book) => !textbooks.some((selected) => selected.textbook === book._id)
  );

  return (
    <Container component="main" maxWidth="md">
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
        <Typography component="h1" variant="h5">
          Create Textbook Request
        </Typography>

        {textbooks.map((textbook, index) => (
          <Grid container spacing={2} key={index} alignItems="center">
            <Grid item xs={5}>
              <TextField
                select
                label="Textbook"
                name="textbook"
                value={textbook.textbook}
                onChange={(event) => handleTextbookChange(index, event)}
                fullWidth
                required
              >
                <MenuItem value="" disabled>
                  Select a textbook
                </MenuItem>
                {availableTextbooks
                  .filter(
                    (book) =>
                      book._id === textbook.textbook ||
                      !textbooks.some(
                        (selected) => selected.textbook === book._id
                      )
                  )
                  .map((book) => (
                    <MenuItem key={book._id} value={book._id}>
                      {book.title}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
            <Grid item xs={5}>
              <TextField
                label="Quantity"
                name="quantity"
                type="number"
                value={textbook.quantity}
                onChange={(event) => handleTextbookChange(index, event)}
                fullWidth
                required
                InputProps={{ inputProps: { min: 1 } }}
              />
            </Grid>
            {index === textbooks.length - 1 ? (
              <Grid item xs={1}>
                <IconButton onClick={addTextbook} color="primary">
                  <AddIcon />
                </IconButton>
              </Grid>
            ) : (
              <Grid item xs={1}>
                <IconButton
                  onClick={() => handleRemoveTextbook(index)}
                  color="secondary"
                >
                  <RemoveIcon />
                </IconButton>
              </Grid>
            )}
          </Grid>
        ))}

        <Box sx={{ mt: 2 }}>
          <Button type="submit" fullWidth variant="contained" color="primary">
            Create Request
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default CreateRequestForm;
