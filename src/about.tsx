import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import AboutPage from "./pages/about";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AboutPage/>
  </React.StrictMode>,
);
