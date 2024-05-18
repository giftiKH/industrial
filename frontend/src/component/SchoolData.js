import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import schoolData from "../data/schoolData";

const SchoolData = () => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Students</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {schoolData.map((school) => (
            <TableRow key={school.id}>
              <TableCell>{school.id}</TableCell>
              <TableCell>{school.name}</TableCell>
              <TableCell>{school.location}</TableCell>
              <TableCell>{school.students}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SchoolData;
