import { useEditor } from "@/context/editor";
import { useSettings } from "@/context/settings";
import { useAppTranslation } from "@/context/translation";
import { KBD_SHORTCUTS } from "@/lib/constants/kbd-shortcuts";
import { AvailableShortcuts } from "@/lib/types/shortcuts";
import { useEffect } from "react";

export default function useKeyboardShortcuts(){
     const {settings} = useSettings()
     const {table, files, setIsDirty, langs} = useAppTranslation()
     const {setSelectedKeys} = useEditor()
     useEffect(() => {
          const handleKeyDown = (event: KeyboardEvent) => {
               const key = event.key==="Escape" ? "esc" : event.key.toLowerCase()
               const parts: string[] = []
               if (event.ctrlKey) parts.push("ctrl")
               if (event.shiftKey) parts.push("shift")
               if (event.altKey) parts.push("alt")
               parts.push(key)
               const action = KBD_SHORTCUTS[parts.join("+") as AvailableShortcuts]
               if (!action) return
               event.preventDefault()
               action({
                    table,
                    targetPath: files.targetPath,
                    setIsDirty,
                    setSelectedKeys,
                    langs,
                    settings
               })
          };
          window.addEventListener("keydown", handleKeyDown);
          return () => {
               window.removeEventListener("keydown", handleKeyDown);
          };
     }, [table, files.targetPath]);
}