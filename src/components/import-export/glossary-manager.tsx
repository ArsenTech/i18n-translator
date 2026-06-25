import { DialogFooter } from "@/components/ui/dialog";
import { useGlossary } from "@/context/glossary";
import type { GlossaryEntry } from "@/lib/types/data";
import { getErrorMessage } from "@/lib/utils";
import { save, open } from "@tauri-apps/plugin-dialog";
import { useState } from "react";
import { toast } from "sonner";
import { readTextFile } from "@tauri-apps/plugin-fs";
import { ButtonGroup } from "@/components/ui/button-group";
import { Download, Upload } from "lucide-react";
import LoadingButton from "@/components/loading-button";
import GlossaryActions from "@/lib/store/glossary";
import { useAppTranslation } from "@/context/translation";
import { exportCSV, exportJSON } from "@/lib/helpers/fs";
import { PARTS_OF_SPEECH } from "@/lib/constants/combobox-items";
import { GlossaryEntriesSchema } from "@/schemas";

export default function ImportExportGlossary(){
     const [isImporting, setIsImporting] = useState(false);
     const [isExporting, setIsExporting] = useState(false);
     const {langs} = useAppTranslation()
     const {setGlossary} = useGlossary()
     const exportGlossary = async() => {
          if(isExporting) return;
          setIsExporting(true)
          try{
               if (!langs.base || !langs.target) {
                    toast.error("Base and target languages are required");
                    return;
               }
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
               const exportFile = path.endsWith(".csv") ? exportCSV : exportJSON<GlossaryEntry[]>;
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
               if (!langs.base || !langs.target) {
                    toast.error("Base and target languages are required");
                    return;
               }
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
               const rawCSV = rawData.split("\n").map(val=>val.split(",").map(val=>val.trim())).slice(1).map(([term, translation, partOfSpeech, domain, caseSensitive])=>({
                    term,
                    translation,
                    partOfSpeech: partOfSpeech as typeof PARTS_OF_SPEECH[number],
                    domain,
                    caseSensitive: caseSensitive === "true"
               }))
               const parsed = GlossaryEntriesSchema.safeParse(path.endsWith(".csv") ? rawCSV : JSON.parse(rawData));
               if (!parsed.success) {
                    toast.error("Invalid glossary file");
                    return;
               }
               setGlossary(parsed.data)
               await GlossaryActions.setGlossary(langs,parsed.data)
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
     )
}