import { CssBaseline, ThemeProvider } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { theme } from "./utils/theme";
import Routes from "./Routes";

import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Routes />
      <ToastContainer theme="light" />
      <CssBaseline />
    </ThemeProvider>
  );
};

export default App;
