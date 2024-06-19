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
import NavigationButton from "../common/NavigationButton";

function UserList() {
  const { users, error, editUser, deleteUser } = useUserContext();
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

  // Log users array whenever it updates
  useEffect(() => {
    console.log(" users:", users);
  }, [users]);

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
      <NavigationButton buttonText="Add New User" route="/add-user" />
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
          {users ? (
            users.length > 0 ? (
              users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.full_name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.organization ? user.organization.name : "N/A"}
                  </TableCell>
                  <TableCell>{user.phone || "N/A"}</TableCell>
                  <TableCell>{user.role || "N/A"}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleEdit(user)}
                      style={{ color: "#07375c" }} // Edit button color
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(user._id)}
                      style={{ color: "red" }} // Delete button color
                    >
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
            )
          ) : (
            <TableRow>
              <TableCell colSpan={6} align="center">
                Loading...
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
