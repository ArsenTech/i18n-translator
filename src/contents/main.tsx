import TranslationInputLoader from "@/components/loaders/input";
import LanguageSelectLoader from "@/components/loaders/language-select";
import QuickAccessToolbarLoader from "@/components/loaders/quick-access";
import TranslatorStatsLoader from "@/components/loaders/stats";
import TableLoader from "@/components/loaders/table";
import TreeSidebarLoader from "@/components/loaders/tree-sidebar";
import WindowWrapper from "@/components/window";
import useKeyboardShortcuts from "@/hooks/use-kbd-shortcuts";
import { mockupData } from "@/lib/constants"
import { buildTree } from "@/lib/helpers";
import { ITranslation } from "@/lib/types";
import { lazy, Suspense, useMemo, useState } from "react";

const TranslationTable = lazy(()=>import("@/components/translation-table"))
const TreeSidebar = lazy(()=>import("@/components/main-translation/tree-sidebar"))
const TranslatorStats = lazy(()=>import("@/components/main-translation/stats"))
const TranslationInput = lazy(()=>import("@/components/main-translation/translation-input"))
const QuickAccessToolbar = lazy(()=>import("@/components/main-translation/quick-access"))
const LanguageSelect = lazy(()=>import("@/components/main-translation/language-select"))

export default function MainPage(){
     const [currTranslation, setCurrentTranslation] = useState<ITranslation | null>(null)
     const [input, setInput] = useState("")

     const [selectedNamespace, setSelectedNamespace] = useState<string>("")
     const tree = useMemo(() => buildTree(mockupData), [])

     const tableData = useMemo(() => {
          if (!selectedNamespace) return mockupData
          if (selectedNamespace === "__general") return mockupData.filter(item => !item.keyName.includes("."))
          return mockupData.filter(item =>item.keyName.startsWith(`${selectedNamespace}.`))
     }, [selectedNamespace])

     useKeyboardShortcuts()
     return (
          <WindowWrapper>
               <div className="grid grid-cols-1 md:grid-cols-[0.5fr_1fr] lg:grid-cols-[0.4fr_1fr] xl:grid-cols-[0.3fr_1fr] px-4 py-2 gap-4 md:h-[calc(100dvh-40px)] overflow-hidden">
                    <div className="w-full flex flex-col gap-1 min-h-0 overflow-hidden">
                         <Suspense fallback={(
                              <>
                              <QuickAccessToolbarLoader/>
                              <TreeSidebarLoader/>
                              </>
                         )}>
                              <QuickAccessToolbar/>
                              <TreeSidebar
                                   tree={tree}
                                   onSelectNamespace={setSelectedNamespace}
                                   selectedNamespace={selectedNamespace}
                              />
                         </Suspense>
                    </div>
                    <div className="w-full flex flex-col gap-2 min-h-0 overflow-hidden">
                         <Suspense fallback={(
                              <>
                              <LanguageSelectLoader/>
                              <TableLoader/>
                              <TranslationInputLoader/>
                              <TranslatorStatsLoader/>
                              </>
                         )}>
                              <LanguageSelect/>
                              <TranslationTable
                                   data={tableData}
                                   selected={selectedNamespace}
                                   onSelectTranslation={setCurrentTranslation}
                                   currKey={currTranslation?.keyName ?? ""}
                                   setInput={setInput}
                              />
                              <TranslationInput
                                   currTranslation={currTranslation}
                                   input={input}
                                   onInputChange={setInput}
                              />
                              <TranslatorStats currTranslation={currTranslation} />
                         </Suspense>
                    </div>
               </div>
          </WindowWrapper>
     )
}