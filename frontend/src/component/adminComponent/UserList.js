import React, { useEffect, useState } from "react";
import { useUserContext } from "../../context/UserContext";
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  DialogContentText,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import useOrganizationRoleSelection from "../../hooks/useOrganizationRoleSelection";

function UserList() {
  const { state, getAllUsers, deleteUser, editUser } = useUserContext();
  const { loading, error, users } = state;

  const [editUserData, setEditUserData] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);

  // Integrating useOrganizationRoleSelection hook
  const {
    selectedOrganizationId,
    selectedRole,
    organizations,
    filteredRoles,
    handleOrganizationChange,
    handleRoleChange,
  } = useOrganizationRoleSelection();

  useEffect(() => {
    getAllUsers(); // Fetch users on component mount
  }, []);

  useEffect(() => {
    console.log("Current users:", users); // Log users to check if they are correctly fetched
  }, [users]); // Log users whenever they are updated

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {String(error)}</div>; // Ensure error is a string
  }

  // Ensure users is correctly defined and an array
  const userArray = users && users.success ? users.users : [];

  const handleEdit = (user) => {
    // When editing, set selectedOrganizationId to the user's organization ID
    handleOrganizationChange(user.organization ? user.organization._id : "");

    // Set selectedRole to the user's existing role
    handleRoleChange(user.role || "");

    setEditUserData(user);
    setOpenEditDialog(true);
  };

  const handleEditDialogClose = () => {
    setEditUserData(null);
    setOpenEditDialog(false);
  };

  const handleEditUserSubmit = async () => {
    if (!editUserData || !selectedOrganizationId || !selectedRole) return;

    try {
      // Update the organization and role for the user being edited
      const updatedUser = {
        ...editUserData,
        organization: selectedOrganizationId,
        role: selectedRole,
      };

      await editUser(updatedUser._id, updatedUser); // Assuming editUser handles the update
      setOpenEditDialog(false);
      setEditUserData(null);
      // Optionally, fetch updated users after edit
      getAllUsers();
    } catch (error) {
      console.error("Failed to edit user:", error);
      // Handle error state if necessary
    }
  };

  const handleDelete = (id) => {
    setDeleteUserId(id);
    setConfirmDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteUser(deleteUserId);
      setConfirmDeleteDialogOpen(false);
      setDeleteUserId(null);
      // Optionally, fetch updated users after delete
      getAllUsers();
    } catch (error) {
      console.error("Failed to delete user:", error);
      // Handle error state if necessary
    }
  };

  const handleCancelDelete = () => {
    setConfirmDeleteDialogOpen(false);
    setDeleteUserId(null);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Full Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Organization</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userArray.length > 0 ? (
            userArray.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.full_name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {user.organization ? user.organization.name : "N/A"}
                </TableCell>
                <TableCell>{user.phone || "N/A"}</TableCell>
                <TableCell>{user.role || "N/A"}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(user)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(user._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} align="center">
                No users found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Edit User Dialog */}
      <Dialog open={openEditDialog} onClose={handleEditDialogClose}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            label="Full Name"
            value={editUserData?.full_name || ""}
            onChange={(e) =>
              setEditUserData({ ...editUserData, full_name: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            value={editUserData?.email || ""}
            onChange={(e) =>
              setEditUserData({ ...editUserData, email: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Organization</InputLabel>
            <Select
              value={selectedOrganizationId}
              onChange={(e) => handleOrganizationChange(e.target.value)}
            >
              {organizations.map((org) => (
                <MenuItem key={org.value} value={org.value}>
                  {org.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Select
              value={selectedRole}
              onChange={(e) => handleRoleChange(e.target.value)}
              disabled={!selectedOrganizationId} // Disable if no organization selected
            >
              {filteredRoles.map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* Additional fields as needed */}
          <TextField
            label="Phone"
            value={editUserData?.phone || ""}
            onChange={(e) =>
              setEditUserData({ ...editUserData, phone: e.target.value })
            }
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose}>Cancel</Button>
          <Button
            onClick={handleEditUserSubmit}
            variant="contained"
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirm Delete Dialog */}
      <Dialog open={confirmDeleteDialogOpen} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user?
          </DialogContentText>
         
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
}

export default UserList;
