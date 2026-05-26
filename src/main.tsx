import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import MainPage from "./contents/main";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MainPage/>
  </React.StrictMode>,
);
