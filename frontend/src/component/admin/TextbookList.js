// src/components/TextbookList.js
import React, { useEffect, useState } from "react";
import { getAllTextbooks } from "../../data/textbookService";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ButtonComponent from "../ButtonComponent";

const API_URL = "http://localhost:5000/api/textbooks";

const TextbookList = ({ handleButtonClick }) => {
  const [textbooks, setTextbooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedTextbook, setSelectedTextbook] = useState(null);

  useEffect(() => {
    const fetchTextbooks = async () => {
      try {
        const data = await getAllTextbooks();
        setTextbooks(data.textbooks);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTextbooks();
  }, []);

  const handleEdit = (textbook) => {
    setSelectedTextbook(textbook);
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setSelectedTextbook(null);
    setEditDialogOpen(false);
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(
        `${API_URL}/${selectedTextbook._id}`,
        selectedTextbook
      );
      setTextbooks((prev) =>
        prev.map((tb) => (tb._id === selectedTextbook._id ? response.data : tb))
      );
      handleEditDialogClose();
    } catch (err) {
      console.error("Failed to update textbook:", err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/${selectedTextbook._id}`);
      setTextbooks((prev) =>
        prev.filter((tb) => tb._id !== selectedTextbook._id)
      );
      handleDeleteDialogClose();
    } catch (err) {
      console.error("Failed to delete textbook:", err);
    }
  };

  const handleDeleteDialogOpen = (textbook) => {
    setSelectedTextbook(textbook);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setSelectedTextbook(null);
    setDeleteDialogOpen(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>All Textbooks</h2>
      <ButtonComponent
        name="Add New Textbook"
        onClick={() => handleButtonClick("tbForm")}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Language</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>level</TableCell>
              <TableCell>Grade</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {textbooks.map((textbook, index) => (
              <TableRow key={textbook._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{textbook.title}</TableCell>
                <TableCell>{textbook.subject}</TableCell>
                <TableCell>{textbook.language}</TableCell>
                <TableCell>{textbook.category}</TableCell>
                <TableCell>{textbook.level}</TableCell>
                <TableCell>{textbook.grade}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleEdit(textbook)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDeleteDialogOpen(textbook)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
        <DialogTitle>Edit Textbook</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            value={selectedTextbook?.title || ""}
            onChange={(e) =>
              setSelectedTextbook({
                ...selectedTextbook,
                title: e.target.value,
              })
            }
            fullWidth
            sx={{ mb: 1 }}
          />
          <TextField
            label="Subject"
            value={selectedTextbook?.subject || ""}
            onChange={(e) =>
              setSelectedTextbook({
                ...selectedTextbook,
                subject: e.target.value,
              })
            }
            fullWidth
            sx={{ mb: 1 }}
          />
          <TextField
            label="Language"
            value={selectedTextbook?.language || ""}
            onChange={(e) =>
              setSelectedTextbook({
                ...selectedTextbook,
                language: e.target.value,
              })
            }
            fullWidth
            sx={{ mb: 1 }}
          />
          <TextField
            label="Category"
            value={selectedTextbook?.category || ""}
            onChange={(e) =>
              setSelectedTextbook({
                ...selectedTextbook,
                category: e.target.value,
              })
            }
            fullWidth
            sx={{ mb: 1 }}
          />

          <TextField
            label="Grade"
            value={selectedTextbook?.grade || ""}
            onChange={(e) =>
              setSelectedTextbook({
                ...selectedTextbook,
                grade: e.target.value,
              })
            }
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose}>Cancel</Button>
          <Button
            onClick={handleSaveChanges}
            variant="contained"
            color="primary"
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this textbook?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>Cancel</Button>
          <Button onClick={handleDelete} variant="contained" color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TextbookList;
