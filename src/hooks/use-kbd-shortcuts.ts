import ViewActions from "@/actions/view";
import { useEffect } from "react";

const KBD_SHORTCUTS: Record<string,()=>void> = {
     "ctrl++": ViewActions.zoomIn,
     "ctrl+-": ViewActions.zoomOut,
     "ctrl+0": ViewActions.resetZoom
}

export default function useKeyboardShortcuts(){
     useEffect(() => {
          const handleKeyDown = (event: KeyboardEvent) => {
               const parts: string[] = [] = []
               if (event.ctrlKey) parts.push("ctrl")
               if (event.shiftKey) parts.push("shift")
               if (event.altKey) parts.push("alt")
               parts.push(event.key.toLowerCase())
               const shortcut = parts.join("+")
               const action = KBD_SHORTCUTS[shortcut];
               if (!action) return
               event.preventDefault();
               action()
          };
          window.addEventListener("keydown", handleKeyDown);
          return () => {
               window.removeEventListener("keydown", handleKeyDown);
          };
     }, []);
}