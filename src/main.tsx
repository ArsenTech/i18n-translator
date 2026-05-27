import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import MainPage from "./contents/main";
import { TreeSidebarProvider } from "./context/sidebar";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <TreeSidebarProvider>
      <MainPage/>
    </TreeSidebarProvider>
  </React.StrictMode>,
);
