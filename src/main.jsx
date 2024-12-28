import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom"; // Use BrowserRouter instead of HashRouter
import { StrictMode } from "react";
import Spinner from "./views/Spinner/Spinner.jsx";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Suspense fallback={<Spinner />}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Suspense>
  </StrictMode>
);
