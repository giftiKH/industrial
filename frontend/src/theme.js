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
    lightBlue: { // Add light blue color
      main: "#07375c",
      contrastText: "#ffffff",
    },
    customColor: { // Add custom color #005472
      main: "#005472",
      contrastText: "#ffffff",
    },
  },
});

export default theme;
