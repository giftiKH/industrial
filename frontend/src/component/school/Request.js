import React, { useEffect, useState } from "react";
import { useUserInfo } from "../../utils/authUtils";
import { fetchAllTextbookRequests } from "../../data/textbookRequestService";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const Request = () => {
  const userInfo = useUserInfo();
  const [organizationRequest, setOrganizationRequest] = useState(null);
  const [open, setOpen] = useState(false);
  const [textbookId, setTextbookId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [editingTextbook, setEditingTextbook] = useState(null);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [textbookToDelete, setTextbookToDelete] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requests = await fetchAllTextbookRequests();
        const orgRequest = requests.find(
          (request) =>
            request.userID.organization._id === userInfo.organizationId
        );
        setOrganizationRequest(orgRequest);
      } catch (error) {
        console.error("Error fetching textbook requests:", error);
      }
    };

    if (userInfo) {
      fetchData();
    }
  }, [userInfo]);

  const handleAddTextbook = () => {
    setEditingTextbook(null);
    setTextbookId("");
    setQuantity("");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTextbookId("");
    setQuantity("");
  };

  const handleSave = async () => {
    if (!textbookId || !quantity) {
      alert("Please enter a textbook ID and quantity");
      return;
    }

    let updatedTextbooks;
    if (editingTextbook) {
      updatedTextbooks = organizationRequest.textbooks.map((item) =>
        item.textbook._id === editingTextbook.textbook._id
          ? { ...item, quantity: parseInt(quantity) }
          : item
      );
    } else {
      updatedTextbooks = [
        ...organizationRequest.textbooks,
        { textbook: textbookId, quantity: parseInt(quantity) },
      ];
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/api/textbookRequests/${organizationRequest._id}`,
        { textbooks: updatedTextbooks }
      );

      setOrganizationRequest(response.data);
      handleClose();
    } catch (error) {
      console.error("Error updating textbook request:", error);
    }
  };

  const handleEditTextbook = (textbook) => {
    setEditingTextbook(textbook);
    setTextbookId(textbook.textbook._id);
    setQuantity(textbook.quantity);
    setOpen(true);
  };

  const handleOpenDeleteConfirmation = (textbook) => {
    setTextbookToDelete(textbook);
    setOpenDeleteConfirmation(true);
  };

  const handleCloseDeleteConfirmation = () => {
    setOpenDeleteConfirmation(false);
    setTextbookToDelete(null);
  };

  const handleDeleteTextbook = async () => {
    if (!textbookToDelete) return;

    try {
      const updatedTextbooks = organizationRequest.textbooks.filter(
        (item) => item.textbook._id !== textbookToDelete.textbook._id
      );

      const response = await axios.put(
        `http://localhost:5000/api/textbookRequests/${organizationRequest._id}`,
        { textbooks: updatedTextbooks }
      );

      setOrganizationRequest(response.data);
      handleCloseDeleteConfirmation();
    } catch (error) {
      console.error("Error deleting textbook from request:", error);
    }
  };

  const handleSubmitRequest = () => {
    console.log("Submit request");
  };

  const handleDeleteRequest = async () => {
    try {
      // Make an API call to delete the request
      await axios.delete(
        `http://localhost:5000/api/textbookRequests/${organizationRequest._id}`
      );

      // If successful, set organizationRequest to null
      setOrganizationRequest(null);
      console.log("Request deleted successfully");
    } catch (error) {
      console.error("Error deleting request:", error);
    }
  };

  const handleStartNewRequest = () => {
    console.log("Starting a new request");
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Textbook Request
      </Typography>
      {organizationRequest ? (
        <Box>
          <Typography variant="h6" gutterBottom>
            Your Organization's Request
          </Typography>
          <Typography gutterBottom>
            Request Date:{" "}
            {new Date(organizationRequest.requestDate).toLocaleDateString()}
          </Typography>
          <Box mb={2}>
            <Button variant="contained" onClick={handleAddTextbook}>
              Add Textbook
            </Button>
          </Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Grade</TableCell>
                  <TableCell>Subject</TableCell>
                  <TableCell>Language</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {organizationRequest.textbooks.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.textbook.title}</TableCell>
                    <TableCell>{item.textbook.grade}</TableCell>
                    <TableCell>{item.textbook.subject}</TableCell>
                    <TableCell>{item.textbook.language}</TableCell>
                    <TableCell>{item.textbook.category}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => handleEditTextbook(item)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        onClick={() => handleOpenDeleteConfirmation(item)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box mt={2}>
            <Button variant="contained" onClick={handleSubmitRequest}>
              Submit Request
            </Button>
            <Button
              variant="contained"
              onClick={handleDeleteRequest}
              sx={{ ml: 1 }}
            >
              Delete Request
            </Button>
          </Box>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
              {editingTextbook ? "Edit Textbook" : "Add Textbook"}
            </DialogTitle>
            <DialogContent>
              <TextField
                margin="normal"
                label="Textbook ID"
                fullWidth
                value={textbookId}
                onChange={(e) => setTextbookId(e.target.value)}
                disabled={!!editingTextbook}
              />
              <TextField
                margin="normal"
                label="Quantity"
                fullWidth
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleSave} color="primary" variant="contained">
                Save
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={openDeleteConfirmation}
            onClose={handleCloseDeleteConfirmation}
          >
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
              <Typography>
                Are you sure you want to delete this textbook?
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDeleteConfirmation} color="primary">
                Cancel
              </Button>
              <Button onClick={handleDeleteTextbook} color="secondary">
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      ) : (
        <Box>
          <Typography variant="h6" gutterBottom>
            No Request Found for Your Organization
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleStartNewRequest}
          >
            Start New Request
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Request;
