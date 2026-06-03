import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import { TreeSidebarProvider } from "./context/sidebar";
import { AppTranslationProvider } from "./context/translation";
import MainContentLoader from "./components/loaders/translator";
import { TooltipProvider } from "./components/ui/tooltip";
import { Toaster } from "sonner";

const MainPage = lazy(()=>import("./contents/main"))

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AppTranslationProvider>
      <TreeSidebarProvider>
        <TooltipProvider>
          <Suspense fallback={<MainContentLoader/>}>
            <MainPage/>
          </Suspense>
          <Toaster
            richColors
            position="top-right"
            duration={2000}
          />
        </TooltipProvider>
      </TreeSidebarProvider>
    </AppTranslationProvider>
  </React.StrictMode>,
);
