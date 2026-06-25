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

export default function ImportExportSettings(){
     const {settings, providers, toolbars, setSettings, setProviders, setToolbars} = useSettings();
     const {theme, color, brightness, updateAppearance} = useAppearance()
     const [isImporting, setIsImporting] = useState(false);
     const [isExporting, setIsExporting] = useState(false);
     const exportSettings = async() => {
          if(isExporting) return;
          setIsExporting(true)
          try{
               const path = await save({
                    title: "Export Settings As",
                    filters: [
                         { name: "JSON File", extensions: ["json"] },
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
               toast.success("Settings exported successfully")
          } catch (err) {
               toast.error("Failed to export settings",{
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
                    title: "Import settings from file",
                    filters: [
                         { name: "JSON File", extensions: ["json"] },
                    ],
                    defaultPath: "settings.json",
                    directory: false,
               })
               if(!path) return;
               const rawData = await readTextFile(path)
               if(rawData.trim()===""){
                    toast.error("The content here is empty");
                    return;
               }
               const parsed = SettingsMetadataSchema.safeParse(JSON.parse(rawData));
               if (!parsed.success) {
                    toast.error("Invalid settings file");
                    return;
               }
               const {settings, providers, toolbars, appearance} = parsed.data
               setSettings(settings)
               setProviders(providers)
               setToolbars(toolbars)
               updateAppearance(appearance)
               toast.success("Settings Imported Successfully")
          } catch (err){
               toast.error("Failed to import settings",{
                    description: getErrorMessage(err)
               })
          } finally {
               setIsImporting(false)
          }
     }
     return (
          <DialogFooter>
               <ButtonGroup>
                    <LoadingButton onClick={importSettings} isLoading={isImporting} loaderText="Importing..." variant="outline">
                         <Upload/>
                         Import
                    </LoadingButton>
                    <LoadingButton onClick={exportSettings} isLoading={isExporting} loaderText="Exporting..." variant="outline">
                         <Download/>
                         Export
                    </LoadingButton>
               </ButtonGroup>
          </DialogFooter>
     )
}