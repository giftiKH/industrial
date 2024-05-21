import React, { useState, useEffect } from "react";
import { fetchOrganizations } from "../../data/organizationService";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const AllOrg = () => {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const handleEdit = (id) => {
    // Handle edit action
    console.log("Edit organization with id:", id);
  };

  const handleDelete = (id) => {
    // Handle delete action
    console.log("Delete organization with id:", id);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>All Organizations</h2>
      <TableContainer component={Paper}>
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
                  <IconButton onClick={() => handleEdit(org._id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(org._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AllOrg;
