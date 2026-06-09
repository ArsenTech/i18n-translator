import EditActions from "@/actions/edit";
import FileActions from "@/actions/file";
import ViewActions from "@/actions/view";
import { useAppTranslation } from "@/context/translation";
import { SetStateType } from "@/lib/types";
import { ITranslation } from "@/lib/types/data";
import { useEffect } from "react";
import { toast } from "sonner";

const KBD_SHORTCUTS: Record<string,({table, targetPath, setIsDirty}: {
     table: ITranslation[],
     targetPath: string,
     setIsDirty: SetStateType<boolean>,
     setSelectedKeys: SetStateType<Set<string>>
})=>void> = {
     "ctrl++": _ => ViewActions.zoomIn(),
     "ctrl+-": _ => ViewActions.zoomOut(),
     "ctrl+0": _ => ViewActions.resetZoom(),
     "ctrl+s": ({table, targetPath, setIsDirty}) => FileActions.saveAll(table, targetPath).then(res=>{
          if(res?.error) toast.error("Failed to save the file",{
               description: res.error
          })
          if(res?.success) {
               toast.success(res.success)
               setIsDirty(false)
          }
     }),
     "ctrl+shift+s": ({table, setIsDirty}) => FileActions.saveAs(table).then(res=>{
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

export default function useKeyboardShortcuts(){
     const {table, files, setIsDirty, setSelectedKeys} = useAppTranslation()
     useEffect(() => {
          const handleKeyDown = (event: KeyboardEvent) => {
               const key = event.key==="Escape" ? "esc" : event.key.toLowerCase()
               const parts: string[] = []
               if (event.ctrlKey) parts.push("ctrl")
               if (event.shiftKey) parts.push("shift")
               if (event.altKey) parts.push("alt")
               parts.push(key)
               const action = KBD_SHORTCUTS[parts.join("+")]
               if (!action) return
               event.preventDefault()
               action({
                    table,
                    targetPath: files.targetPath,
                    setIsDirty,
                    setSelectedKeys
               })
          };
          window.addEventListener("keydown", handleKeyDown);
          return () => {
               window.removeEventListener("keydown", handleKeyDown);
          };
     }, [table, files.targetPath]);
}