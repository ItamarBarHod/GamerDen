import { createTheme } from "@mui/material";
import { blue } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: blue[200],
    },
    text: {
      primary: "#000000",
      secondary: "#000000",
    },
  },
});

export default theme;
