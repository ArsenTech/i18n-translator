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
import { useTranslation } from "react-i18next";

export default function ImportExportGlossary(){
     const {t} = useTranslation("import-export")
     const {t: validationTxt} = useTranslation("validation")
     const [isImporting, setIsImporting] = useState(false);
     const [isExporting, setIsExporting] = useState(false);
     const {langs} = useAppTranslation()
     const {setGlossary} = useGlossary()
     const exportGlossary = async() => {
          if(isExporting) return;
          setIsExporting(true)
          try{
               if (!langs.base || !langs.target) {
                    toast.error(t("glossary.no-base-target"));
                    return;
               }
               const path = await save({
                    title: t("glossary.export"),
                    filters: [
                         { name: t("files.json"), extensions: ["json"] },
                         { name: t("files.csv"), extensions: ["csv"] }
                    ],
                    defaultPath: "glossary.json"
               })
               if(!path) return;
               const data = await GlossaryActions.getGlossary(langs, validationTxt)
               const exportFile = path.endsWith(".csv") ? exportCSV : exportJSON<GlossaryEntry[]>;
               await exportFile(path, data)
               toast.success(t("glossary.success.export"))
          } catch (err) {
               toast.error(t("glossary.error.export"),{
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
                    toast.error(t("glossary.no-base-target"));
                    return;
               }
               const path = await open({
                    title: t("glossary.import"),
                    filters: [
                         { name: t("files.json"), extensions: ["json"] },
                         { name: t("files.csv"), extensions: ["csv"] }
                    ],
                    defaultPath: "glossary.json",
                    directory: false,
               })
               if(!path) return;
               const rawData = await readTextFile(path)
               if(rawData.trim()===""){
                    toast.error(t("empty-content"));
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
                    toast.error(t("glossary.invalid"));
                    return;
               }
               setGlossary(parsed.data)
               await GlossaryActions.setGlossary(langs,parsed.data, validationTxt)
               toast.success(t("glossary.success.import"))
          } catch (err){
               toast.error(t("glossary.error.import"),{
                    description: getErrorMessage(err)
               })
          } finally {
               setIsImporting(false)
          }
     }
     return (
          <DialogFooter>
               <ButtonGroup>
                    <LoadingButton onClick={importGlossary} isLoading={isImporting} loaderText={t("import.loading")} variant="outline">
                         <Upload/>
                         {t("import.current")}
                    </LoadingButton>
                    <LoadingButton onClick={exportGlossary} isLoading={isExporting} loaderText={t("export.loading")} variant="outline">
                         <Download/>
                         {t("export.current")}
                    </LoadingButton>
               </ButtonGroup>
          </DialogFooter>
     )
}