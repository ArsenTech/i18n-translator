import EditActions from "@/actions/edit"
import FileActions from "@/actions/file"
import ViewActions from "@/actions/view"
import { toast } from "sonner"
import { ShortcutsType } from "../types/shortcuts"

export const KBD_SHORTCUTS: ShortcutsType = {
     "ctrl++": _ => ViewActions.zoomIn(),
     "ctrl+-": _ => ViewActions.zoomOut(),
     "ctrl+0": _ => ViewActions.resetZoom(),
     "ctrl+s": ({table, targetPath, setIsDirty, langs, settings, t}) => FileActions.saveAll(table, targetPath, langs, settings.preserveEmpty, settings.xliffPreserveMeta, t).then(res=>{
          if(res?.error) toast.error("Failed to save the file",{
               description: res.error
          })
          if(res?.success) {
               toast.success(res.success)
               setIsDirty(false)
          }
     }),
     "ctrl+shift+s": ({table, setIsDirty, langs, settings, t}) => FileActions.saveAs(table, langs, settings.preserveEmpty, settings.xliffPreserveMeta, t).then(res=>{
          if(res?.error) toast.error("Failed to save the file",{
               description: res.error
          })
          if(res?.success) {
               toast.success(res.success)
               setIsDirty(false)
          }
     }),
     "ctrl+a": ({setSelectedKeys, table}) => EditActions.selectAll(table,setSelectedKeys),
     "esc": ({setSelectedKeys}) => EditActions.clearSelection(setSelectedKeys)
}