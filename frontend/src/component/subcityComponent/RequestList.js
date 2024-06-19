import React, { useState, useEffect } from "react";
import { useTextbookRequestContext } from "../../context/TextbookRequestContext";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function RequestList() {
  const { getAllTextbookRequestsByYear } = useTextbookRequestContext();
  const navigate = useNavigate(); // Get navigate function from react-router-dom
  const [year, setYear] = useState(new Date().getFullYear());
  const [filteredRequests, setFilteredRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await getAllTextbookRequestsByYear(year);
        console.log("Fetched requests:", data); // Log the data for debugging
        setFilteredRequests(data);
      } catch (err) {
        console.error("Error fetching requests:", err);
      }
    };

    fetchRequests();
  }, [year, getAllTextbookRequestsByYear]);

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const navigateToRequestDetail = (id) => {
    navigate(`/requests/${id}`); // Navigate to RequestDetail component with the ID
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "accepted":
        return { backgroundColor: "#4caf50", color: "#ffffff" }; // Green
      case "rejected":
        return { backgroundColor: "#f44336", color: "#ffffff" }; // Red
      case "not evaluated":
        return { backgroundColor: "#fdd835", color: "#000000" }; // Yellow
      default:
        return { backgroundColor: "#ffffff", color: "#000000" }; // White (fallback)
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <Typography variant="h5" gutterBottom style={{ marginBottom: 16 }}>
        Textbook Requests
      </Typography>
      <FormControl style={{ marginBottom: 16 }}>
        <InputLabel id="year-select-label">Select Year</InputLabel>
        <Select
          labelId="year-select-label"
          id="year-select"
          value={year}
          onChange={handleYearChange}
          style={{ minWidth: 120 }}
        >
          <MenuItem value={2024}>2024</MenuItem>
          <MenuItem value={2023}>2023</MenuItem>
          <MenuItem value={2022}>2022</MenuItem>
          {/* Add more years as needed */}
        </Select>
      </FormControl>

      <TableContainer
        component={Paper}
        elevation={3}
        style={{ marginTop: 16, background: "#f0f0f0" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Organization</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Evaluation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRequests.map((request, index) => (
              <TableRow
                key={request._id}
                onClick={() => navigateToRequestDetail(request._id)}
                style={{ cursor: "pointer" }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  {request.userID?.organization?.name || "N/A"}
                </TableCell>
                <TableCell>{request.year}</TableCell>
                <TableCell>{request.requestDate}</TableCell>
                <TableCell>
                  <Button
                    size="small" // Adjust the size as needed
                    variant="contained"
                    style={{
                      ...getStatusStyle(request.evaluation?.status),
                      textTransform: "none", // Optional: Prevents uppercase transformation
                      minWidth: 80, // Adjust width if necessary
                      minHeight: 24, // Adjust height if necessary
                      fontSize: 12, // Adjust font size if necessary
                    }}
                    onClick={() => navigateToRequestDetail(request._id)}
                  >
                    {request.evaluation?.status || "N/A"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default RequestList;
