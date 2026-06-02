import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import { TreeSidebarProvider } from "./context/sidebar";
import { AppTranslationProvider } from "./context/translation";
import MainContentLoader from "./components/loaders/translator";

const MainPage = lazy(()=>import("./contents/main"))

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AppTranslationProvider>
      <TreeSidebarProvider>
        <Suspense fallback={<MainContentLoader/>}>
          <MainPage/>
        </Suspense>
      </TreeSidebarProvider>
    </AppTranslationProvider>
  </React.StrictMode>,
);
