// theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#07375c", // Your primary color
    },
    secondary: {
      main: "#0d7590", // Your secondary color
    },
    background: {
      default: "#e3e2e3", // Default background color
    },
    text: {
      primary: "#07375c", // Default text color
    },
  },
});

export default theme;
