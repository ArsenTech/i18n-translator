import { LanguageSelectLoader, TableLoader } from "@/loaders/translator";
import { lazy, Suspense } from "react";
import { GlossaryInputLoader } from "@/loaders/glossary";
import { ImportExportLoader } from "@/loaders/fields";

const LanguageSelect = lazy(()=>import("@/components/main-translation/language-select"))
const GlossaryTable = lazy(()=>import("@/components/tables/glossary"))
const GlossaryInput = lazy(()=>import("@/components/main-translation/glossary-input"))
const ImportExportGlossary = lazy(()=>import("@/components/import-export/glossary-manager"));

export default function GlossaryManager(){
     return (
          <Suspense fallback={(
               <>
               <LanguageSelectLoader/>
               <TableLoader rows={8} cols={[200,200,32,50,50]}/>
               <GlossaryInputLoader/>
               <ImportExportLoader/>
               </>
          )}>
               <LanguageSelect/>
               <GlossaryTable/>
               <GlossaryInput/>
               <ImportExportGlossary/>
          </Suspense>
     )
}