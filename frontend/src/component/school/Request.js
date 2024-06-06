import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import RequestDetails from "./RequestDetails";
import OrganizationRequest from "./OrganizationRequest";
import TextbookSelect from "./TextbookSelect";
import {
  updateTextbookRequest,
  updateSingleTextbook,
} from "../../data/textbookService";


const Request = () => {
  const [requestId, setRequestId] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [formData, setFormData] = useState({
    textbookId: "",
    quantity: "",
  });
  const [showTable, setShowTable] = useState(true); // Manage the visibility of the table
  const [isAddingTextbook, setIsAddingTextbook] = useState(false); // State to manage the visibility of the add textbook form


  useEffect(() => {
    if (requestId) {
      console.log("OrganizationRequest result:", requestId);
    }
  }, [requestId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  

  


  const handleEditTextbook = async (textbookId, newQuantity) => {
    try {
      // Create the payload for updating the textbook quantity
      const updatePayload = {
        quantity: newQuantity,
      };

      // Update the textbook quantity on the backend
      const response = await updateSingleTextbook(
        requestId,
        textbookId,
        updatePayload
      );
      if (response.status === 200) {
        console.log("Textbook quantity updated successfully:", response.data);
        setSelectedRequest(response.data); // Update the selected request with the updated data
      } else {
        console.error(
          "Failed to update textbook quantity:",
          response.data.message
        );
      }
    } catch (error) {
      console.error("Error updating textbook quantity:", error);
    }
  };

  const handleDeleteTextbook = async (textbookId) => {
    try {
      // Filter out the textbook to be deleted
      const updatedTextbooks = selectedRequest.textbooks.filter(
        (textbook) => textbook.textbook._id !== textbookId
      );

      // Update the request with the filtered textbooks
      const updatedRequest = {
        ...selectedRequest,
        textbooks: updatedTextbooks,
      };

      // Update the request on the backend
      const response = await updateTextbookRequest(requestId, updatedRequest);
      if (response.status === 200) {
        console.log("Textbook deleted successfully:", response.data);
        setSelectedRequest(response.data); // Update the selected request with the updated data
      } else {
        console.error("Failed to delete textbook:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting textbook:", error);
    }
  };

  return (
    <div>
      <OrganizationRequest setRequestId={setRequestId} />
      {!showTable && isAddingTextbook && (
        <form >
          <div>
            <TextbookSelect
              for="addTextbook"
              requestId={requestId}
              selectedRequest={selectedRequest}
              setSelectedRequest={setSelectedRequest}
              setShowTable={setShowTable}
              formData={formData}
              setFormData={setFormData}
              
            />
          </div>
        </form>
      )}
      {showTable &&
        requestId &&
        requestId !== "no request" &&
        requestId !== "error" && (
          <>
            <RequestDetails
              requestId={requestId}
              setRequest={setSelectedRequest}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setShowTable(false);
                setIsAddingTextbook(true);
              }} // Show the add textbook form when clicking the button
            >
              Add Textbook
            </Button>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Language</TableCell>
                    <TableCell>Grade</TableCell>
                    <TableCell>Subject</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Action</TableCell> {/* Add Action column */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedRequest &&
                    selectedRequest.textbooks.map((textbook, index) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{textbook.textbook.title}</TableCell>
                        <TableCell>{textbook.textbook.language}</TableCell>
                        <TableCell>{textbook.textbook.grade}</TableCell>
                        <TableCell>{textbook.textbook.subject}</TableCell>
                        <TableCell>{textbook.textbook.category}</TableCell>
                        <TableCell>{textbook.quantity}</TableCell>
                        <TableCell>
                          <IconButton
                            onClick={() =>
                              handleEditTextbook(
                                textbook.textbook._id,
                                textbook.quantity
                              )
                            }
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            onClick={() =>
                              handleDeleteTextbook(textbook.textbook._id)
                            }
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      {requestId === "no request" && (
        <form >
          <div>
            <TextbookSelect formData={formData} handleChange={handleChange} />
          </div>

          <Button type="submit" variant="contained" color="primary">
            Create Request
          </Button>
        </form>
      )}
      {requestId === "error" && <div>Error fetching request data.</div>}
    </div>
  );
};

export default Request;





