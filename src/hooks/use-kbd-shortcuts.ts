import FileActions from "@/actions/file";
import ViewActions from "@/actions/view";
import { useAppTranslation } from "@/context/translation";
import { ITranslation } from "@/lib/types/data";
import { useEffect } from "react";
import { toast } from "sonner";

const KBD_SHORTCUTS: Record<string,({table, targetPath}: {
     table: ITranslation[],
     targetPath: string
})=>void> = {
     "ctrl++": _ => ViewActions.zoomIn(),
     "ctrl+-": _ => ViewActions.zoomOut(),
     "ctrl+0": _ => ViewActions.resetZoom(),
     "ctrl+s": ({table, targetPath}) => FileActions.saveAll(table, targetPath).then(res=>{
          if(res?.error) toast.error("Failed to save the file",{
               description: res.error
          })
          if(res?.success) toast.success(res.success)
     }),
     "ctrl+shift+s": ({table}) => FileActions.saveAs(table).then(res=>{
          if(res?.error) toast.error("Failed to save the file",{
               description: res.error
          })
          if(res?.success) toast.success(res.success)
     })
}

export default function useKeyboardShortcuts(){
     const {table, files} = useAppTranslation()
     useEffect(() => {
          const handleKeyDown = (event: KeyboardEvent) => {
               const parts: string[] = []
               if (event.ctrlKey) parts.push("ctrl")
               if (event.shiftKey) parts.push("shift")
               if (event.altKey) parts.push("alt")
               parts.push(event.key.toLowerCase())
               const action = KBD_SHORTCUTS[parts.join("+")]
               if (!action) return
               event.preventDefault()
               action({
                    table,
                    targetPath: files.targetPath,
               })
          };
          window.addEventListener("keydown", handleKeyDown);
          return () => {
               window.removeEventListener("keydown", handleKeyDown);
          };
     }, [table, files.targetPath]);
}