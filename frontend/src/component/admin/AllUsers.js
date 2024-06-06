import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Snackbar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@mui/material/styles";
import EditUserDialog from "./EditUserDialog";
import ButtonComponent from "../ButtonComponent";

const AllUsers = ({ handleButtonClick }) => {
  const theme = useTheme();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users/all-users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data.users);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (userId) => {
    const user = users.find((user) => user._id === userId);
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${userIdToDelete}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to delete user");
      }
      setUsers(users.filter((user) => user._id !== userIdToDelete));
      setSnackbarMessage("User deleted successfully");
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage(`Error deleting user: ${error.message}`);
      setSnackbarOpen(true);
    } finally {
      setDeleteDialogOpen(false);
      setUserIdToDelete(null);
    }
  };

  const handleDeleteClick = (userId) => {
    setUserIdToDelete(userId);
    setDeleteDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedUser(null);
  };

  const handleSave = () => {
    handleDialogClose();
    setSnackbarMessage("User updated successfully");
    setSnackbarOpen(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>All Users</h2>
      <Box mb={2} textAlign="right">
        <ButtonComponent
          name="Add New User"
          onClick={() => handleButtonClick("newUser")}
          style={{ 
            color: theme.palette.primary.contrastText, 
            backgroundColor: theme.palette.primary.main,
            border: 'none',
            padding: '10px 20px',
            cursor: 'pointer',
            borderRadius: '4px'
          }} 
        />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Organization</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={user._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user.full_name}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  {user.organization ? user.organization.name : ""}
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEdit(user._id)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteClick(user._id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <EditUserDialog
        user={selectedUser}
        open={isDialogOpen}
        onClose={handleDialogClose}
        onSave={handleSave}
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AllUsers;
