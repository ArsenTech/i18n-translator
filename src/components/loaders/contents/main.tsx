import TranslationInputLoader from "../input";
import LanguageSelectLoader from "../language-select";
import QuickAccessToolbarLoader from "../quick-access";
import TranslatorStatsLoader from "../stats";
import TableLoader from "../table";
import TreeSidebarLoader from "../tree-sidebar";

export default function MainContentLoader(){
     return (
          <div className="grid grid-cols-1 md:grid-cols-[0.5fr_1fr] lg:grid-cols-[0.4fr_1fr] xl:grid-cols-[0.3fr_1fr] px-4 py-2 gap-4 md:h-[calc(100dvh-40px)] overflow-hidden">
               <div className="w-full flex flex-col gap-1 min-h-0 overflow-hidden">
                    <QuickAccessToolbarLoader/>
                    <TreeSidebarLoader/>
               </div>
               <div className="w-full flex flex-col gap-2 min-h-0 overflow-hidden">
                    <LanguageSelectLoader/>
                    <TableLoader/>
                    <TranslationInputLoader/>
                    <TranslatorStatsLoader/>
               </div>
          </div>
     )
}