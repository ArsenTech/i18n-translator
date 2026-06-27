import { useState } from "react";
import { save, open } from "@tauri-apps/plugin-dialog";
import { ISettingsMetadata } from "@/lib/types/settings";
import FetcherActions from "@/actions/fetcher";
import { useSettings } from "@/context/settings";
import { useAppearance } from "@/context/appearance";
import { exportJSON } from "@/lib/helpers/fs";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/utils";
import { readTextFile } from "@tauri-apps/plugin-fs";
import { SettingsMetadataSchema } from "@/schemas/settings";
import { DialogFooter } from "@/components/ui/dialog";
import LoadingButton from "@/components/loading-button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Upload, Download } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function ImportExportSettings(){
     const {t} = useTranslation("import-export")
     const {settings, providers, toolbars, setSettings, setProviders, setToolbars} = useSettings();
     const {theme, color, brightness, updateAppearance} = useAppearance()
     const [isImporting, setIsImporting] = useState(false);
     const [isExporting, setIsExporting] = useState(false);
     const exportSettings = async() => {
          if(isExporting) return;
          setIsExporting(true)
          try{
               const path = await save({
                    title: t("settings.export"),
                    filters: [
                         { name: t("files.json"), extensions: ["json"] },
                    ],
                    defaultPath: "settings.json"
               })
               if(!path) return;
               const details = await FetcherActions.fetchDetails()
               const data: ISettingsMetadata = {
                    schemaVersion: 1,
                    name: details.name,
                    version: details.version,
                    identifier: details.identifier,
                    appearance: {
                         theme,
                         color,
                         brightness
                    },
                    settings,
                    providers,
                    toolbars
               }
               await exportJSON(path,data)
               toast.success(t("settings.success.export"))
          } catch (err) {
               toast.error(t("settings.error.export"),{
                    description: getErrorMessage(err)
               })
          } finally {
               setIsExporting(false)
          }
     }
     const importSettings = async() => {
          if(isImporting) return;
          setIsImporting(true)
          try {
               const path = await open({
                    title: t("settings.import"),
                    filters: [
                         { name: t("files.json"), extensions: ["json"] },
                    ],
                    defaultPath: "settings.json",
                    directory: false,
               })
               if(!path) return;
               const rawData = await readTextFile(path)
               if(rawData.trim()===""){
                    toast.error(t("empty-content"));
                    return;
               }
               const parsed = SettingsMetadataSchema.safeParse(JSON.parse(rawData));
               if (!parsed.success) {
                    toast.error(t("settings.invalid"));
                    return;
               }
               const {settings, providers, toolbars, appearance} = parsed.data
               setSettings(settings)
               setProviders(providers)
               setToolbars(toolbars)
               updateAppearance(appearance)
               toast.success(t("settings.success.import"))
          } catch (err){
               toast.error(t("settings.error.import"),{
                    description: getErrorMessage(err)
               })
          } finally {
               setIsImporting(false)
          }
     }
     return (
          <DialogFooter>
               <ButtonGroup>
                    <LoadingButton onClick={importSettings} isLoading={isImporting} loaderText={t("import.loading")} variant="outline">
                         <Upload/>
                         {t("import.current")}
                    </LoadingButton>
                    <LoadingButton onClick={exportSettings} isLoading={isExporting} loaderText={t("export.loading")} variant="outline">
                         <Download/>
                         {t("export.current")}
                    </LoadingButton>
               </ButtonGroup>
          </DialogFooter>
     )
}