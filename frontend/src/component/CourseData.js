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
import courseData from "../data/courseData";

const CourseData = () => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Instructor</TableCell>
            <TableCell>Credits</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {courseData.map((course) => (
            <TableRow key={course.id}>
              <TableCell>{course.id}</TableCell>
              <TableCell>{course.title}</TableCell>
              <TableCell>{course.instructor}</TableCell>
              <TableCell>{course.credits}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CourseData;
