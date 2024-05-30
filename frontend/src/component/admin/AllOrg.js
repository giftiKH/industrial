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
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box, // Import Box from MUI
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { fetchOrganizations } from "../../data/organizationService";
import axios from "axios";
import { useTheme } from "@mui/material/styles"; // Import useTheme from MUI
import ButtonComponent from "../ButtonComponent"; // Import ButtonComponent

const AllOrg = ({ handleButtonClick }) => {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteOrgId, setDeleteOrgId] = useState(null);
  const [editOrg, setEditOrg] = useState(null);

  const theme = useTheme(); // Define theme

  useEffect(() => {
    const loadOrganizations = async () => {
      try {
        const orgs = await fetchOrganizations();
        setOrganizations(orgs);
        setLoading(false);
      } catch (error) {
        setError("Error fetching organizations");
        setLoading(false);
      }
    };

    loadOrganizations();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/org/${id}`);
      setOrganizations(organizations.filter((org) => org._id !== id));
      setDeleteOrgId(null); // Close the delete confirmation dialog
    } catch (error) {
      console.error("Error deleting organization:", error.message);
    }
  };

  const handleEdit = (organization) => {
    setEditOrg(organization);
  };

  const handleEditSubmit = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/org/${editOrg._id}`,
        editOrg
      );
      const updatedOrganization = response.data;
      setOrganizations(
        organizations.map((org) =>
          org._id === updatedOrganization._id ? updatedOrganization : org
        )
      );
      setEditOrg(null); // Close the edit dialog
    } catch (error) {
      console.error("Error updating organization:", error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2 style={{ color: "#005472" }}>All Organizations</h2>
      <Box mb={2} textAlign="right">
        <ButtonComponent
          name="Add New Org"
        onClick={() => handleButtonClick("newOrg")}
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
        <Table >
          <TableHead >
            <TableRow> 
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Fax</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {organizations.map((org, index) => (
              <TableRow key={org._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{org.name}</TableCell>
                <TableCell>{org.email}</TableCell>
                <TableCell>{org.phone}</TableCell>
                <TableCell>{org.fax}</TableCell>
                <TableCell>{org.location}</TableCell>
                <TableCell>{org.type}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(org)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => setDeleteOrgId(org._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete Confirmation Dialog */}
      {deleteOrgId && (
        <Dialog
          open={Boolean(deleteOrgId)}
          onClose={() => setDeleteOrgId(null)}
        >
          <DialogTitle>Delete Organization</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this organization?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteOrgId(null)}>Cancel</Button>
            <Button onClick={() => handleDelete(deleteOrgId)} color="primary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Edit Organization Dialog */}
      {editOrg && (
        <Dialog open={Boolean(editOrg)} onClose={() => setEditOrg(null)}>
          <DialogTitle>
            {editOrg._id ? "Edit Organization" : "Add New Organization"}
          </DialogTitle>
          <DialogContent>
            <TextField
              label="Name"
              value={editOrg.name || ""}
              onChange={(e) => setEditOrg({ ...editOrg, name: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              value={editOrg.email || ""}
              onChange={(e) =>
                setEditOrg({ ...editOrg, email: e.target.value })
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Phone"
              value={editOrg.phone || ""}
              onChange={(e) =>
                setEditOrg({ ...editOrg, phone: e.target.value })
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Fax"
              value={editOrg.fax || ""}
              onChange={(e) => setEditOrg({ ...editOrg, fax: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Location"
              value={editOrg.location || ""}
              onChange={(e) =>
                setEditOrg({ ...editOrg, location: e.target.value })
              }
              fullWidth
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Type</InputLabel>
              <Select
                value={editOrg.type || ""}
                onChange={(e) =>
                  setEditOrg({ ...editOrg, type: e.target.value })
                }
              >
                <MenuItem value="AACEB">AACEB</MenuItem>
                <MenuItem value="sub-city">sub-city</MenuItem>
                <MenuItem value="private-school">private-school</MenuItem>
                <MenuItem value="public-school">public-school</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditOrg(null)}>Cancel</Button>
            <Button onClick={handleEditSubmit} color="primary">
              {editOrg._id ? "Update" : "Add"}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default AllOrg;
