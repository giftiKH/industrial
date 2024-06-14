import React, { useContext, useState } from "react";
import TextbookContext from "../../context/TextbookContext"; // Adjust the import based on your folder structure
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
} from "@mui/icons-material";

const TextbookList = () => {
  const { textbooks, error, updateTextbook, deleteTextbook } =
    useContext(TextbookContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editTextbook, setEditTextbook] = useState(null);
  const [deleteTextbookId, setDeleteTextbookId] = useState(null);
  const [editGrade, setEditGrade] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editSubject, setEditSubject] = useState("");
  const [editLanguage, setEditLanguage] = useState("");
  const [editCategory, setEditCategory] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (textbook) => {
    setEditTextbook(textbook);
    setEditGrade(textbook.grade);
    setEditTitle(textbook.title);
    setEditSubject(textbook.subject);
    setEditLanguage(textbook.language);
    setEditCategory(textbook.category);
    setEditDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    try {
      const updatedTextbook = {
        ...editTextbook, 
        grade: editGrade,
        title: editTitle,
        subject: editSubject,
        language: editLanguage,
        category: editCategory,
      };
      await updateTextbook(updatedTextbook._id, updatedTextbook);
      setEditDialogOpen(false);
    } catch (err) {
      console.error("Error updating textbook:", err);
    }
  };

  const handleCancelEdit = () => {
    setEditDialogOpen(false);
  };

  const handleOpenDeleteDialog = (id) => {
    setDeleteTextbookId(id);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const handleDelete = async () => {
    try {
      await deleteTextbook(deleteTextbookId);
      setDeleteDialogOpen(false);
    } catch (err) {
      console.error("Error deleting textbook:", err);
    }
  };

  return (
    <Paper>
      {error && <p>{error}</p>}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={textbooks.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Grade</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Language</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Level</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {textbooks
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((textbook, index) => (
                <TableRow key={textbook._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{textbook.grade}</TableCell>
                  <TableCell>{textbook.title}</TableCell>
                  <TableCell>{textbook.subject}</TableCell>
                  <TableCell>{textbook.language}</TableCell>
                  <TableCell>{textbook.category}</TableCell>
                  <TableCell>{textbook.level}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(textbook)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => handleOpenDeleteDialog(textbook._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit dialog */}
      <Dialog open={editDialogOpen} onClose={handleCancelEdit}>
        <DialogTitle>Edit Textbook</DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            label="Grade"
            fullWidth
            value={editGrade}
            onChange={(e) => setEditGrade(e.target.value)}
          />
          <TextField
            margin="normal"
            label="Title"
            fullWidth
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <TextField
            margin="normal"
            label="Subject"
            fullWidth
            value={editSubject}
            onChange={(e) => setEditSubject(e.target.value)}
          />
          <Select
            margin="normal"
            value={editLanguage}
            onChange={(e) => setEditLanguage(e.target.value)}
            fullWidth
            label="Language"
          >
            <MenuItem value="amharic">Amharic</MenuItem>
            <MenuItem value="english">English</MenuItem>
            <MenuItem value="afaan oromo">Afaan Oromo</MenuItem>
          </Select>
          <Select
            margin="normal"
            value={editCategory}
            onChange={(e) => setEditCategory(e.target.value)}
            fullWidth
            label="Category"
          >
            <MenuItem value="teacher guide">Teacher Guide</MenuItem>
            <MenuItem value="student textbook">Student Textbook</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelEdit} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveEdit} color="secondary">
            <SaveIcon /> Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete confirmation dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this textbook?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            <DeleteIcon /> Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default TextbookList;
