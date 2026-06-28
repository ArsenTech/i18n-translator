import { TranslationInputLoader, LanguageSelectLoader, QuickAccessToolbarLoader, TranslatorStatsLoader, TableLoader } from "@/loaders/translator"
import WindowWrapper from "@/components/window";
import { useTreeSidebar } from "@/context/tree-sidebar";
import { useAppTranslation } from "@/context/translation";
import useKeyboardShortcuts from "@/hooks/use-kbd-shortcuts";
import { buildTree } from "@/lib/helpers/data";
import { cn } from "@/lib/utils";
import { lazy, Suspense, useEffect, useMemo } from "react";
import { useGlossary } from "@/context/glossary";
import { GlossarySidebarLoader } from "@/loaders/glossary";
import { TreeSidebarLoader } from "@/loaders/tree-sidebar";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useSettings } from "@/context/settings";
import { toast } from "sonner";
import { check } from "@tauri-apps/plugin-updater";
import { AppearanceProvider } from "@/context/appearance";
import { useTranslation } from "react-i18next";

const TranslationTable = lazy(()=>import("@/components/tables/translation"))
const TreeSidebar = lazy(()=>import("@/components/main-translation/tree-sidebar"))
const TranslatorStats = lazy(()=>import("@/components/main-translation/stats"))
const TranslationInput = lazy(()=>import("@/components/main-translation/input"))
const QuickAccessToolbar = lazy(()=>import("@/components/main-translation/quick-access"))
const LanguageSelect = lazy(()=>import("@/components/main-translation/language-select"))
const GlossarySidebar = lazy(()=>import("@/components/main-translation/glossary-sidebar"))
const CommandsPopup = lazy(()=>import("@/popups/command"))

export default function MainPage(){
     const {t} = useTranslation("translation",{
          keyPrefix: "auto-update"
     })
     const {t: sidebarTxt} = useTranslation("translation",{
          keyPrefix: "tree-sidebar"
     })
     const {table} = useAppTranslation()
     const {open: treeOpen} = useTreeSidebar()
     const {open: glossaryOpen, glossary} = useGlossary()
     const {settings} = useSettings()
     const tree = useMemo(() => buildTree(table,sidebarTxt), [table,sidebarTxt])
     useKeyboardShortcuts()
     useEffect(() => {
          if (!settings.checkUpdatesOnStartup) return;
          toast.promise(
               check({ timeout: 100000 }),
               {
                    id: "startup-update-check",
                    loading: t("checking"),
                    success: result => result ? t("new-version",{version: result.version}) : t("updated"),
                    error: t("failed")
               }
          );
     }, [settings.checkUpdatesOnStartup]);
     return (
          <AppearanceProvider>
               <TooltipProvider>
                    <WindowWrapper>
                         <Suspense fallback={<QuickAccessToolbarLoader/>}>
                              <QuickAccessToolbar/>
                         </Suspense>
                         <div className={cn(
                              "grid grid-cols-1 px-4 py-2 gap-4 md:h-[calc(100dvh-80px)] overflow-hidden",
                              (!treeOpen && !glossaryOpen) && "md:grid-cols-1",
                              (treeOpen && !glossaryOpen) && "md:grid-cols-[250px_1fr]",
                              (!treeOpen && glossaryOpen) && "md:grid-cols-[1fr_200px]",
                              (treeOpen && glossaryOpen) && "md:grid-cols-[250px_1fr_200px]"
                         )}>
                              {treeOpen && (
                                   <Suspense fallback={<TreeSidebarLoader/>}>
                                        <TreeSidebar tree={tree} />
                                   </Suspense>
                              )}
                              <Suspense fallback={(
                                   <div className="w-full flex flex-col gap-2 min-h-0 overflow-hidden">
                                        <LanguageSelectLoader/>
                                        <TableLoader cols={[150, 400, 400, 50]}/>
                                        <TranslationInputLoader/>
                                        <TranslatorStatsLoader/>
                                   </div>
                              )}>
                                   <div className="w-full flex flex-col gap-2 min-h-0 overflow-hidden">
                                        <LanguageSelect/>
                                        <TranslationTable/>
                                        <TranslationInput/>
                                        <TranslatorStats/>
                                   </div>
                                   <CommandsPopup/>
                              </Suspense>
                              {glossaryOpen && (
                                   <Suspense fallback={<GlossarySidebarLoader/>}>
                                        <GlossarySidebar glossary={glossary.slice(0, 100)}/>
                                   </Suspense>
                              )}
                         </div>
                    </WindowWrapper>
                    <Toaster
                         richColors
                         position="top-right"
                    />
               </TooltipProvider>
          </AppearanceProvider>
     )
}