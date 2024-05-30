// src/components/RequestList.js
import React, { useEffect, useState } from "react";
import { fetchAllTextbookRequests } from "../../data/textbookRequestService";
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const RequestList = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await fetchAllTextbookRequests();
        console.log("Fetched Data:", data); // Log the fetched data to the console
        setRequests(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching requests:", err.message); // Log any errors
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Request Date</TableCell>
            <TableCell>User</TableCell>
            <TableCell>Organization</TableCell>
            <TableCell>Textbooks</TableCell>
            <TableCell>Evaluation Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {requests.map((request) => (
            <TableRow key={request._id}>
              <TableCell>
                {new Date(request.requestDate).toLocaleDateString()}
              </TableCell>
              <TableCell>{request.userID.full_name}</TableCell>
              <TableCell>{request.userID.organization.name}</TableCell>
              <TableCell>
                {request.textbooks.map((tb, index) => (
                  <div key={index}>
                    <strong>Title:</strong> {tb.textbook.title}
                    <br />
                    <strong>Quantity:</strong> {tb.quantity}
                  </div>
                ))}
              </TableCell>
              <TableCell>{request.evaluation.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RequestList;
