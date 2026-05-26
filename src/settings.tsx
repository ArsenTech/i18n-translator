import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import SettingsPage from "./contents/settings";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <SettingsPage/>
  </React.StrictMode>,
);
