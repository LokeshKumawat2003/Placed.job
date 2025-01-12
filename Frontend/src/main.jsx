import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import App from "./App.jsx";
import { UrlProvider } from "./context/UrlContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <UrlProvider>
        <App />
      </UrlProvider>
      <ToastContainer />
    </StrictMode>
  </BrowserRouter>
);
