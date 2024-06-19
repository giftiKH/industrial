import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTextbookRequestContext } from "../../context/TextbookRequestContext";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
} from "@mui/material";
import moment from "moment";
import tokenDecoder from "../../utils/tokenDecoder";

function RequestDetail() {
  const { id } = useParams(); // Get the ID parameter from the URL
  const {
    getTextbookRequest,
    updateTextbookRequestEvaluation,
    loading,
    error,
  } = useTextbookRequestContext();
  const [request, setRequest] = useState(null);
  const [evaluation, setEvaluation] = useState({
    status: "not evaluated",
    evaluatedBy: null,
    comment: "",
    evaluationDate: null,
  });
  const [isEditing, setIsEditing] = useState(false);

  const userData = tokenDecoder();

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const data = await getTextbookRequest(id); // Fetch request details by ID
        setRequest(data);
        if (data.evaluation) {
          setEvaluation(data.evaluation);
        }
      } catch (err) {
        console.error("Error fetching request details:", err);
      }
    };

    if (id) {
      fetchRequest();
    }
  }, []);

  const handleEvaluationChange = (event) => {
    const { name, value } = event.target;
    setEvaluation((prevEvaluation) => ({
      ...prevEvaluation,
      [name]: value,
    }));
  };

  const handleSaveEvaluation = async () => {
    try {
      const updatedEvaluation = {
        ...evaluation,
        evaluatedBy: userData.userId, // Set evaluatedBy to the current user ID
        evaluationDate: new Date(),
      };
      await updateTextbookRequestEvaluation(id, updatedEvaluation);
      setIsEditing(false);
      alert("Evaluation updated successfully!");
    } catch (err) {
      console.error("Error updating evaluation:", err);
      alert("Failed to update evaluation.");
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  if (loading) {
    return <Typography variant="h5">Loading...</Typography>;
  }

  if (error) {
    return (
      <Typography variant="h5" color="error">{`Error: ${error}`}</Typography>
    );
  }

  if (!request) {
    return <Typography variant="h5">Request not found</Typography>;
  }

  return (
    <div style={{ padding: 16 }}>
      <Paper
        style={{
          padding: 16,
          marginBottom: 16,
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#f9f9f9",
          width: "50%", // Adjust width here
        }}
      >
        <Typography variant="h5" gutterBottom>
          Request Detail
        </Typography>
        <Typography variant="body1" gutterBottom>
          Organization: {request.userID.organization.name}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Year: {request.year}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Date: {moment(request.requestDate).format("MMMM Do, YYYY")}
        </Typography>
      </Paper>

      <Paper
        style={{
          padding: 16,
          marginBottom: 16,
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#f9f9f9",
        }}
      >
        <Typography variant="h6" style={{ marginTop: 16 }}>
          Textbooks
        </Typography>
        <TableContainer style={{ marginTop: 8 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Index</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Grade</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell>Language</TableCell>
                <TableCell>Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {request.textbooks.map((textbook, index) => (
                <TableRow key={textbook._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{textbook.textbook.title}</TableCell>
                  <TableCell>{textbook.textbook.grade}</TableCell>
                  <TableCell>{textbook.textbook.subject}</TableCell>
                  <TableCell>{textbook.textbook.language}</TableCell>
                  <TableCell>{textbook.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Paper
        style={{
          padding: 16,
          marginBottom: 16,
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#f9f9f9",
        }}
      >
        <Typography variant="h6" style={{ marginTop: 16 }}>
          Evaluation
        </Typography>
        <form style={{ marginTop: 8 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="status-select-label">Status</InputLabel>
                <Select
                  labelId="status-select-label"
                  id="status-select"
                  name="status"
                  value={evaluation.status}
                  onChange={handleEvaluationChange}
                  disabled={!isEditing}
                >
                  <MenuItem value="accepted">Accepted</MenuItem>
                  <MenuItem value="rejected">Rejected</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Comment"
                name="comment"
                value={evaluation.comment}
                onChange={handleEvaluationChange}
                disabled={!isEditing}
                style={{ marginTop: 16 }}
              />
            </Grid>
            <Grid item xs={6}>
              {evaluation.status !== "not evaluated" && !isEditing && (
                <>
                  <Typography variant="body1" gutterBottom>
                    Evaluated By:{" "}
                    {evaluation.evaluatedBy
                      ? evaluation.evaluatedBy.full_name
                      : "N/A"}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Evaluation Date:{" "}
                    {evaluation.evaluationDate
                      ? moment(evaluation.evaluationDate).format(
                          "MMMM Do, YYYY"
                        )
                      : "N/A"}
                  </Typography>
                </>
              )}
              {isEditing ? (
                <Button
                  variant="contained"
                  onClick={handleSaveEvaluation}
                  style={{
                    marginTop: 16,
                    textTransform: "none",
                    backgroundColor: "#07375c",
                    color: "#fff",
                  }}
                >
                  Save Evaluation
                </Button>
              ) : (
                <>
                  {evaluation.status === "not evaluated" ? (
                    <Button
                      variant="contained"
                      onClick={handleEditClick}
                      style={{
                        marginTop: 16,
                        textTransform: "none",
                        backgroundColor: "#07375c",
                        color: "#fff",
                      }}
                    >
                      Start Evaluation
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={handleEditClick}
                      style={{
                        marginTop: 16,
                        textTransform: "none",
                        backgroundColor: "#07375c",
                        color: "#fff",
                      }}
                    >
                      Edit Evaluation
                    </Button>
                  )}
                </>
              )}
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
}

export default RequestDetail;
