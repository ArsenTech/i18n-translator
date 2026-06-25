import { DialogFooter } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { LanguageSelectLoader, QuickAccessToolbarLoader, TableLoader, TranslationInputLoader, TranslatorStatsLoader } from "../translator";
import { GlossaryInputLoader, GlossarySidebarLoader } from "../glossary";
import TitlebarLoader from "../titlebar";
import { TreeSidebarLoader } from "../tree-sidebar";
import { cn } from "@/lib/utils";
import { useTreeSidebar } from "@/context/tree-sidebar";
import { useGlossary } from "@/context/glossary";
import { ImportExportLoader } from "../fields";

export function UpdaterLoader(){
     return (
          <>
               <Skeleton className="h-5 md:h-6 lg:h-[30px] w-full"/>
               <Skeleton className="rounded-md h-4 w-1/2"/>
               <DialogFooter>
                    <Skeleton className="h-8 w-48"/>
               </DialogFooter>
          </>
     )
}
export function GlossaryManagerLoader(){
     return (
          <>
               <LanguageSelectLoader/>
               <TableLoader rows={8} cols={[200,200,32,50,50]}/>
               <GlossaryInputLoader/>
               <ImportExportLoader/>
          </>
     )
}
export function MainContentLoader(){
     const {open: treeOpen} = useTreeSidebar()
     const {open: glossaryOpen} = useGlossary()
     return (
          <>
          <TitlebarLoader/>
          <QuickAccessToolbarLoader/>
          <div className={cn(
               "grid grid-cols-1 px-4 py-2 gap-4 md:h-[calc(100dvh-80px)] overflow-hidden",
               (!treeOpen && !glossaryOpen) && "md:grid-cols-1",
               (treeOpen && !glossaryOpen) && "md:grid-cols-[250px_1fr]",
               (!treeOpen && glossaryOpen) && "md:grid-cols-[1fr_200px]",
               (treeOpen && glossaryOpen) && "md:grid-cols-[250px_1fr_200px]"
          )}>
               {treeOpen && (
                    <TreeSidebarLoader/>
               )}
               <div className="w-full flex flex-col gap-2 min-h-0 overflow-hidden">
                    <LanguageSelectLoader/>
                    <TableLoader cols={[150, 400, 400, 50]}/>
                    <TranslationInputLoader/>
                    <TranslatorStatsLoader/>
               </div>
               {glossaryOpen && (
                    <GlossarySidebarLoader/>
               )}
          </div>
          </>
     )
}