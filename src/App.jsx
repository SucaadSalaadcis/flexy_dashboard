import React from "react";
import { useRoutes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { baseTheme } from './assets/global/Theme-variable'
import Themeroutes from "./routes/Router.jsx";
import { Toaster } from "react-hot-toast";

const App = () => {
  const routing = useRoutes(Themeroutes);
  const theme = baseTheme;
  return (
    <>
      <ThemeProvider theme={theme}>
        {routing}
      </ThemeProvider>
      <Toaster
        toastOptions={{
          className: '',
          style: {
            border: '1px solid #713200',
            padding: '16px',
            color: '#713200',
            // background: 'green',

          },
        }}
      />
    </>

  );
};

export default App;
