import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

// 👉 Añade esta línea para activar i18n
import "./i18n";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
// This code initializes the React application, setting up the main App component within a BrowserRouter for routing.
// It also imports global styles from `index.css` and initializes internationalization (i18n) support by importing the `i18n` configuration file.
// The `ReactDOM.createRoot`    