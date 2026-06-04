import { TranslationInputLoader, LanguageSelectLoader, QuickAccessToolbarLoader, TreeSidebarLoader, TranslatorStatsLoader, TableLoader} from "@/components/loaders/translator"
import WindowWrapper from "@/components/window";
import { useTreeSidebar } from "@/context/sidebar";
import { useAppTranslation } from "@/context/translation";
import useKeyboardShortcuts from "@/hooks/use-kbd-shortcuts";
import { buildTree } from "@/lib/helpers";
import { cn } from "@/lib/utils";
import { lazy, Suspense, useMemo, useState } from "react";

const TranslationTable = lazy(()=>import("@/components/translation-table"))
const TreeSidebar = lazy(()=>import("@/components/main-translation/tree-sidebar"))
const TranslatorStats = lazy(()=>import("@/components/main-translation/stats"))
const TranslationInput = lazy(()=>import("@/components/main-translation/input"))
const QuickAccessToolbar = lazy(()=>import("@/components/main-translation/quick-access"))
const LanguageSelect = lazy(()=>import("@/components/main-translation/language-select"))

export default function MainPage(){
     const [input, setInput] = useState("")
     const {table} = useAppTranslation()
     const {open} = useTreeSidebar()

     const [selectedNamespace, setSelectedNamespace] = useState<string>("")
     const tree = useMemo(() => buildTree(table), [table])

     const tableData = useMemo(() => {
          if (!selectedNamespace) return table
          if (selectedNamespace === "__general") return table.filter(item => !item.keyName.includes("."))
          return table.filter(item =>item.keyName.startsWith(`${selectedNamespace}.`))
     }, [selectedNamespace, table])

     useKeyboardShortcuts()
     return (
          <WindowWrapper>
               <Suspense fallback={<QuickAccessToolbarLoader/>}>
                    <QuickAccessToolbar/>
               </Suspense>
               <div className={cn(
                    "grid grid-cols-1 px-4 py-2 gap-4 md:h-[calc(100dvh-80px)] overflow-hidden",
                    open ? "md:grid-cols-[300px_1fr]" : "md:grid-cols-1"
               )}>
                    {open && (
                         <Suspense fallback={<TreeSidebarLoader/>}>
                              <TreeSidebar
                                   tree={tree}
                                   onSelectNamespace={setSelectedNamespace}
                                   selectedNamespace={selectedNamespace}
                              />
                         </Suspense>
                    )}
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
                                   setInput={setInput}
                              />
                              <TranslationInput
                                   visibleTable={tableData}
                                   input={input}
                                   onInputChange={setInput}
                              />
                              <TranslatorStats/>
                         </Suspense>
                    </div>
               </div>
          </WindowWrapper>
     )
}