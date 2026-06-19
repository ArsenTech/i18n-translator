import { DialogFooter } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { LanguageSelectLoader, QuickAccessToolbarLoader, TableLoader, TranslationInputLoader, TranslatorStatsLoader } from "../translator";
import { GlossaryInputLoader, GlossarySidebarLoader } from "../glossary";
import TitlebarLoader from "../titlebar";
import { TreeSidebarLoader } from "../tree-sidebar";

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
               <DialogFooter>
                    <Skeleton className="h-8 w-48"/>
               </DialogFooter>
          </>
     )
}
export function MainContentLoader(){
     return (
          <>
          <TitlebarLoader/>
          <QuickAccessToolbarLoader/>
          <div className="grid grid-cols-1 md:grid-cols-[250px_1fr_200px] px-4 py-2 gap-4 md:h-[calc(100dvh-80px)] overflow-hidden">
               <TreeSidebarLoader/>
               <div className="w-full flex flex-col gap-2 min-h-0 overflow-hidden">
                    <LanguageSelectLoader/>
                    <TableLoader cols={[150, 400, 400, 50]}/>
                    <TranslationInputLoader/>
                    <TranslatorStatsLoader/>
               </div>
               <GlossarySidebarLoader/>
          </div>
          </>
     )
}