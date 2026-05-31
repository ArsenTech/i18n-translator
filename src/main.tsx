import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import MainPage from "./contents/main";
import { TreeSidebarProvider } from "./context/sidebar";
import { AppTranslationProvider } from "./context/translation";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AppTranslationProvider>
      <TreeSidebarProvider>
        <MainPage/>
      </TreeSidebarProvider>
    </AppTranslationProvider>
  </React.StrictMode>,
);
