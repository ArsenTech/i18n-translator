import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import "@/i18n"
import { MainContentLoader } from "./loaders/contents";
import { GlossaryProvider } from "./context/glossary";
import { AppTranslationProvider } from "./context/translation";
import { TreeSidebarProvider } from "./context/tree-sidebar";
import { SettingsProvider } from "./context/settings";

const MainPage = lazy(()=>import("./contents/main"))

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <SettingsProvider>
      <AppTranslationProvider>
        <TreeSidebarProvider>
          <GlossaryProvider>
            <Suspense fallback={<MainContentLoader/>}>
              <MainPage/>
            </Suspense>
          </GlossaryProvider>
        </TreeSidebarProvider>
      </AppTranslationProvider>
    </SettingsProvider>
  </React.StrictMode>,
);
