import { useAppTranslation } from "@/context/translation";
import { KBD_SHORTCUTS } from "@/lib/constants/kbd-shortcuts";
import { useEffect } from "react";

export default function useKeyboardShortcuts(){
     const {table, files, setIsDirty, setSelectedKeys, langs} = useAppTranslation()
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
               action.fn({
                    table,
                    targetPath: files.targetPath,
                    setIsDirty,
                    setSelectedKeys,
                    langs
               })
          };
          window.addEventListener("keydown", handleKeyDown);
          return () => {
               window.removeEventListener("keydown", handleKeyDown);
          };
     }, [table, files.targetPath]);
}