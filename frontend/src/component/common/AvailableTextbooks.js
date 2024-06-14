import React, { useContext, useState, useEffect } from "react";
import TextbookContext from "../../context/TextbookContext"; // Adjust the import based on your folder structure
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";

const AvailableTextbooks = () => {
  const { textbooks, error } = useContext(TextbookContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalAvailable, setTotalAvailable] = useState(0);

  useEffect(() => {
    // Calculate total available quantity when textbooks change
    if (textbooks.length > 0) {
      const total = textbooks.reduce(
        (acc, curr) => acc + curr.availableQuantity,
        0
      );
      setTotalAvailable(total);
    }
  }, [textbooks]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper>
      {error && <p>{error}</p>}
      <TablePagination
      rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={textbooks.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Grade</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Language</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Available Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {textbooks
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((textbook, index) => (
                <TableRow key={textbook._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{textbook.grade}</TableCell>
                  <TableCell>{textbook.title}</TableCell>
                  <TableCell>{textbook.subject}</TableCell>
                  <TableCell>{textbook.language}</TableCell>
                  <TableCell>{textbook.category}</TableCell>
                  <TableCell>{textbook.price}</TableCell>
                  <TableCell>{textbook.availableQuantity}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div style={{ marginTop: "10px" }}>
        Total Available Textbooks: {totalAvailable}
      </div>
    </Paper>
  );
};

export default AvailableTextbooks;
