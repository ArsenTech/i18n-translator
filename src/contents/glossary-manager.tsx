import { LanguageSelectLoader, TableLoader } from "@/loaders/translator";
import { DialogFooter } from "@/components/ui/dialog";
import { useGlossary } from "@/context/glossary";
import { GlossaryEntry } from "@/lib/types/data";
import { getErrorMessage } from "@/lib/utils";
import { save, open } from "@tauri-apps/plugin-dialog";
import { lazy, Suspense, useState } from "react";
import { toast } from "sonner";
import { readTextFile } from "@tauri-apps/plugin-fs";
import { ButtonGroup } from "@/components/ui/button-group";
import { Download, Upload } from "lucide-react";
import LoadingButton from "@/components/loading-button";
import GlossaryActions from "@/lib/store/glossary";
import { useAppTranslation } from "@/context/translation";
import { exportCSV, exportJSON } from "@/lib/helpers";
import { PARTS_OF_SPEECH } from "@/lib/constants/items";
import { GlossaryInputLoader } from "@/loaders/glossary";

const LanguageSelect = lazy(()=>import("@/components/main-translation/language-select"))
const GlossaryTable = lazy(()=>import("@/components/tables/glossary"))
const GlossaryInput = lazy(()=>import("@/components/main-translation/glossary-input"))

export default function GlossaryManager(){
     const [isImporting, setIsImporting] = useState(false);
     const [isExporting, setIsExporting] = useState(false);
     const {langs} = useAppTranslation()
     const {setGlossary} = useGlossary()
     const exportGlossary = async() => {
          if(isExporting) return;
          setIsExporting(true)
          try{
               const path = await save({
                    title: "Export Glossary As",
                    filters: [
                         { name: "JSON File", extensions: ["json"] },
                         { name: "CSV File", extensions: ["csv"] }
                    ],
                    defaultPath: "glossary.json"
               })
               if(!path) return;
               const data = await GlossaryActions.getGlossary(langs)
               const exportFile = path.endsWith(".csv") ? exportCSV : exportJSON;
               await exportFile(path, data)
               toast.success("Glossary exported successfully")
          } catch (err) {
               toast.error("Failed to export glossary",{
                    description: getErrorMessage(err)
               })
          } finally {
               setIsExporting(false)
          }
     }
     const importGlossary = async() => {
          if(isImporting) return;
          setIsImporting(true)
          try {
               const path = await open({
                    title: "Import Glossary from file",
                    filters: [
                         { name: "JSON File", extensions: ["json"] },
                         { name: "CSV File", extensions: ["csv"] }
                    ],
                    defaultPath: "glossary.json",
                    directory: false,
               })
               if(!path) return;
               const rawData = await readTextFile(path)
               if(rawData.trim()===""){
                    toast.error("The content here is empty");
                    return;
               }
               if(path.endsWith(".csv")) {
                    const data = rawData.split("\n").map(val=>val.split(",").map(val=>val.trim())).slice(1)
                    const entries: GlossaryEntry[] = data.map(([term, translation, partOfSpeech, domain, caseSensitive])=>({
                         term,
                         translation,
                         partOfSpeech: partOfSpeech as typeof PARTS_OF_SPEECH[number],
                         domain,
                         caseSensitive: caseSensitive==="true" ? true : false
                    }))
                    setGlossary(entries)
                    await GlossaryActions.setGlossary(langs,entries)
               } else {
                    const data = JSON.parse(rawData) as GlossaryEntry[];
                    if (!Array.isArray(data)) {
                         throw new Error("Invalid glossary file")
                    }
                    setGlossary(data)
                    await GlossaryActions.setGlossary(langs,data)
               }
               toast.success("Glossary Imported Successfully")
          } catch (err){
               toast.error("Failed to import Glossary",{
                    description: getErrorMessage(err)
               })
          } finally {
               setIsImporting(false)
          }
     }
     return (
          <>
               <Suspense fallback={(
                    <>
                    <LanguageSelectLoader/>
                    <TableLoader rows={8} cols={[200,200,32,50,50]}/>
                    <GlossaryInputLoader/>
                    </>
               )}>
                    <LanguageSelect/>
                    <GlossaryTable/>
                    <GlossaryInput/>
               </Suspense>
               <DialogFooter>
                    <ButtonGroup>
                         <LoadingButton onClick={importGlossary} isLoading={isImporting} loaderText="Importing..." variant="outline">
                              <Upload/>
                              Import
                         </LoadingButton>
                         <LoadingButton onClick={exportGlossary} isLoading={isExporting} loaderText="Exporting..." variant="outline">
                              <Download/>
                              Export
                         </LoadingButton>
                    </ButtonGroup>
               </DialogFooter>
          </>
     )
}