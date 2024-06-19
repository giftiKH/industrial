import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import useRequestData from "../../hooks/useRequestData";
import { useTextbookRequestContext } from "../../context/TextbookRequestContext";

function RequestForm({ requestId }) {
  const { requestData, loading, error } = useRequestData(requestId);
  const { submitTextbookRequest, deleteSingleTextbook, deleteTextbookRequest } =
    useTextbookRequestContext();

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [selectedTextbookId, setSelectedTextbookId] = useState(null);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleAddTextbooks = () => {
    console.log("Request ID:", requestId);
    // Implement navigation or modal to add textbooks
  };

  const handleDeleteRequest = async () => {
    try {
      await deleteTextbookRequest(requestId);
      console.log("Deleted request with ID:", requestId);
      // Implement navigation or success message
    } catch (error) {
      console.error("Error deleting request:", error.message);
    }
  };

  const handleSubmitRequest = async () => {
    try {
      await submitTextbookRequest(requestId);
      console.log("Request submitted successfully");
      // Implement success message or navigate to another page
    } catch (error) {
      console.error("Error submitting request:", error.message);
    }
  };

  const handleEditClick = (textbookId) => {
    console.log("Editing textbook with ID:", textbookId);
    // Implement navigation or modal for editing textbook
  };

  const handleDeleteClick = (textbookId) => {
    setSelectedTextbookId(textbookId);
    setConfirmDelete(true);
  };

  const handleConfirmDelete = async () => {
    try {
      console.log(
        "Deleting textbook with ID:",
        selectedTextbookId,
        "from request ID:",
        requestId
      );
      await deleteSingleTextbook(requestId, selectedTextbookId);
      console.log("Deleted textbook with ID:", selectedTextbookId);
      setConfirmDelete(false); // Close the confirmation dialog
    } catch (error) {
      console.error("Error deleting textbook:", error.message);
      // Add further error handling as needed
    }
  };

  const handleCloseDeleteDialog = () => {
    setConfirmDelete(false);
  };

  return (
    <div>
      <Typography variant="h5" mb={2}>
        Request Form
      </Typography>

      {requestData && (
        <div>
          <Box mb={2} display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              sx={{ backgroundColor: "#07375c", color: "#fff" }}
              onClick={handleAddTextbooks}
            >
              Add Textbooks
            </Button>
          </Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Textbook Title</TableCell>
                  <TableCell>Grade</TableCell>
                  <TableCell>Subject</TableCell>
                  <TableCell>Language</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Level</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {requestData.textbooks.map((textbookEntry) => (
                  <TableRow key={textbookEntry._id}>
                    <TableCell>{textbookEntry.textbook.title}</TableCell>
                    <TableCell>{textbookEntry.textbook.grade}</TableCell>
                    <TableCell>{textbookEntry.textbook.subject}</TableCell>
                    <TableCell>{textbookEntry.textbook.language}</TableCell>
                    <TableCell>{textbookEntry.textbook.category}</TableCell>
                    <TableCell>{textbookEntry.textbook.level}</TableCell>
                    <TableCell>{textbookEntry.quantity}</TableCell>
                    <TableCell>
                      <IconButton
                        sx={{ color: "#07375c" }}
                        onClick={() => handleEditClick(textbookEntry._id)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        sx={{ color: "red" }}
                        onClick={() => handleDeleteClick(textbookEntry._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              sx={{ backgroundColor: "#07375c", color: "#fff" }}
              onClick={handleSubmitRequest}
            >
              Submit Request
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteRequest}
              sx={{ ml: 2 }}
            >
              Delete Request
            </Button>
          </Box>
        </div>
      )}

      {/* Confirmation Dialog for Delete */}
      <Dialog
        open={confirmDelete}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete this textbook?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default RequestForm;
