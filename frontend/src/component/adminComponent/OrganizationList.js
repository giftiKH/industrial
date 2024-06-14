import React, { useContext, useState, useEffect } from "react";
import OrganizationContext from "../../context/OrganizationContext";
import {
  Paper,
  TableContainer,
  Table,
  TableCell,
  TableRow,
  TableHead,
  TableBody,
  TablePagination,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import roleTypeOptions from "../../utils/typeOptionsConfig";


const OrganizationList = () => {
  const { organizations, updateOrganization, removeOrganization } =
    useContext(OrganizationContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false); // State for delete confirmation dialog
  const [selectedOrganizationId, setSelectedOrganizationId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editFax, setEditFax] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [editType, setEditType] = useState("");

  useEffect(() => {
    console.log("Organizations data:", organizations); // Ensure organizations are logged correctly
  }, [organizations]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (organizationId) => {
    const organization = organizations.organizations.find(
      (org) => org._id === organizationId
    );
    if (organization) {
      setSelectedOrganizationId(organizationId);
      setEditName(organization.name);
      setEditEmail(organization.email);
      setEditPhone(organization.phone);
      setEditFax(organization.fax);
      setEditLocation(organization.location); // Populate location field
      setEditType(organization.type); // Populate type field
      setEditOpen(true);
    }
  };

  const handleCloseEdit = () => {
    setSelectedOrganizationId(null);
    setEditName("");
    setEditEmail("");
    setEditPhone("");
    setEditFax("");
    setEditLocation("");
    setEditType("");
    setEditOpen(false);
  };

  const handleSaveEdit = async () => {
    try {
      const updatedOrganization = {
        name: editName,
        email: editEmail,
        phone: editPhone,
        fax: editFax,
        location: editLocation, // Include location in updated data
        type: editType, // Include type in updated data
      };

      await updateOrganization(selectedOrganizationId, updatedOrganization);
      console.log(
        `Successfully updated organization with ID: ${selectedOrganizationId}`
      );
      handleCloseEdit();
    } catch (error) {
      console.error("Error updating organization:", error);
      // Handle error state or display error message
    }
  };

  const handleDelete = (organizationId) => {
    setSelectedOrganizationId(organizationId);
    setDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await removeOrganization(selectedOrganizationId);
      console.log(
        `Successfully deleted organization with ID: ${selectedOrganizationId}`
      );
      setDeleteOpen(false);
    } catch (error) {
      console.error("Error deleting organization:", error);
      // Handle error state or display error message
    }
  };

  const handleCloseDelete = () => {
    setSelectedOrganizationId(null);
    setDeleteOpen(false);
  };

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Fax</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Actions</TableCell>
              {/* Add other headers as needed */}
            </TableRow>
          </TableHead>
          <TableBody>
            {organizations.success && organizations.organizations.length > 0 ? (
              organizations.organizations
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((organization, index) => (
                  <TableRow key={organization._id}>
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>{organization.name}</TableCell>
                    <TableCell>{organization.email}</TableCell>
                    <TableCell>{organization.phone}</TableCell>
                    <TableCell>{organization.fax}</TableCell>
                    <TableCell>{organization.location}</TableCell>
                    <TableCell>{organization.type}</TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="edit"
                        onClick={() => handleEdit(organization._id)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleDelete(organization._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                    {/* Render other fields as needed */}
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={7}>No organizations found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={organizations.organizations.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Edit Organization Dialog */}
      <Dialog open={editOpen} onClose={handleCloseEdit}>
        <DialogTitle>Edit Organization</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Name"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
          <TextField
            fullWidth
            label="Email"
            value={editEmail}
            onChange={(e) => setEditEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label="Phone"
            value={editPhone}
            onChange={(e) => setEditPhone(e.target.value)}
          />
          <TextField
            fullWidth
            label="Fax"
            value={editFax}
            onChange={(e) => setEditFax(e.target.value)}
          />
          <TextField
            fullWidth
            label="Location"
            value={editLocation}
            onChange={(e) => setEditLocation(e.target.value)}
          />
          
          <Select
            fullWidth
            value={editType}
            onChange={(e) => setEditType(e.target.value)}
          >
            {roleTypeOptions.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>Cancel</Button>
          <Button onClick={handleSaveEdit} variant="contained" color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteOpen} onClose={handleCloseDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this organization?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete}>Cancel</Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            color="secondary"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default OrganizationList;
