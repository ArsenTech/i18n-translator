import { Copy, Minus, Square, X } from "lucide-react"
import { Button } from "./ui/button"
import { ButtonGroup } from "./ui/button-group"
import { getCurrentWindow } from '@tauri-apps/api/window';
import { useEffect, useState } from "react";

interface WindowWrapperProps{
     children: React.ReactNode
}
export default function WindowWrapper({children}: WindowWrapperProps){
     const appWindow = getCurrentWindow()
     const [isMaximized, setIsMaximized] = useState(false)
     const handleClose = async () => appWindow.close();
     const handleToggleMaximize = async () => {
          await appWindow.toggleMaximize();
          setIsMaximized(await appWindow.isMaximized())
     }
     const handleMinimize = async () => appWindow.minimize()
     useEffect(() => {
          const syncState = async () => {
               setIsMaximized(await appWindow.isMaximized())
          }
          syncState()
          const unlisten = appWindow.onResized(syncState)
          return () => {
               unlisten.then(fn => fn())
          }
     }, [])
     return (
          <div className="w-full h-full relative">
               <div data-tauri-drag-region className="flex items-center justify-between gap-2 bg-secondary/85 text-secondary-foreground border-b shadow-xs pl-2 sticky top-0 left-0 z-20 w-full h-9 backdrop-blur-md">
                    <img src="/logo.png" alt="I18N Content Translator" width={24} height={24}/> 
                    <ButtonGroup className="[&>[data-slot]:not(:has(~[data-slot]))]:rounded-none! h-full">
                         <Button size="window-control" variant="ghost" title="Minimize" onClick={handleMinimize}><Minus/></Button>
                         <Button size="window-control" variant="ghost" title={isMaximized ? "Restore Down" : "Maximize"} onClick={handleToggleMaximize}>
                              {isMaximized ? <Copy/> : <Square/>}
                         </Button>
                         <Button size="window-control" variant="ghost-destructive" title="Close" onClick={handleClose}><X/></Button>
                    </ButtonGroup>
               </div>
               {children}
          </div>
     )
}