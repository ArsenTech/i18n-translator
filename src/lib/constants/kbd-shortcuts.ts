import EditActions from "@/actions/edit"
import FileActions from "@/actions/file"
import ViewActions from "@/actions/view"
import { toast } from "sonner"
import { SetStateType, ILangInputState } from "../types"
import { ITranslation } from "../types/data"
import { ISettings } from "../settings/types"

export const KBD_SHORTCUTS: Record<string,{
     name: string,
     fn: ({table, targetPath, setIsDirty}: {
          table: ITranslation[],
          targetPath: string,
          setIsDirty: SetStateType<boolean>,
          setSelectedKeys: SetStateType<Set<string>>,
          langs: ILangInputState,
          settings: ISettings
     })=>void
}> = {
     "ctrl++":{
          name: "Zoom in",
          fn:  _ => ViewActions.zoomIn(),
     },
     "ctrl+-": {
          name: "Zoom Out",
          fn: _ => ViewActions.zoomOut(),
     },
     "ctrl+0": {
          name: "Reset Zoom",
          fn: _ => ViewActions.resetZoom(),
     },
     "ctrl+s": {
          name: "Save Translation",
          fn: ({table, targetPath, setIsDirty, langs, settings}) => FileActions.saveAll(table, targetPath, langs, settings.preserveEmpty, settings.xliffPreserveMeta).then(res=>{
               if(res?.error) toast.error("Failed to save the file",{
                    description: res.error
               })
               if(res?.success) {
                    toast.success(res.success)
                    setIsDirty(false)
               }
          }),
     },
     "ctrl+shift+s": {
          name: "Save Translation as",
          fn: ({table, setIsDirty, langs, settings}) => FileActions.saveAs(table, langs, settings.preserveEmpty, settings.xliffPreserveMeta).then(res=>{
               if(res?.error) toast.error("Failed to save the file",{
                    description: res.error
               })
               if(res?.success) {
                    toast.success(res.success)
                    setIsDirty(false)
               }
          }),
     },
     "ctrl+a": {
          name: "Select All",
          fn: ({setSelectedKeys, table}) => EditActions.selectAll(table,setSelectedKeys),
     },
     "esc": {
          name: "Clear Selection",
          fn: ({setSelectedKeys}) => EditActions.clearSelection(setSelectedKeys)
     }
}
export const SHORTCUTS_INFO: {
     shortcut: string,
     name: string
}[] = Object.entries(KBD_SHORTCUTS).map(([key,val])=>({
     name: val.name,
     shortcut: key.split("+").map(val=>{
          const firstChar = val[0];
          if(!firstChar) return ""
          return firstChar.toUpperCase()+val.slice(1)
     }).join(" + ").trim()
})) 