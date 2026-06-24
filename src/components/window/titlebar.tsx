import { Copy, Minus, Square, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { getCurrentWindow } from "@tauri-apps/api/window";
import { useState, useEffect, lazy, Suspense } from "react";
import { message } from "@tauri-apps/plugin-dialog";
import { useAppTranslation } from "@/context/translation";
import FileActions from "@/actions/file";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/utils";
import { MenubarLoader } from "../../loaders/titlebar";
import { useSettings } from "@/context/settings";

const LogoDropdown = lazy(()=>import("./logo-dropdown"));
const MenuBar = lazy(()=>import("./menubar"))

interface TitleBarProps{
     title?: string,
     hideMaximize?: boolean
}
export default function TitleBar({hideMaximize, title}: TitleBarProps){
     const appWindow = getCurrentWindow()
     const {settings} = useSettings()
     const [isMaximized, setIsMaximized] = useState(false)
     const {isDirty, files, setIsDirty, table, langs} = useAppTranslation()
     const handleClose = async () => {
          if(!isDirty) {
               await appWindow.close();
               return
          }
          const paths = files.targetPath.split("\\")
          const confirmation = await message(`Do you want to save changes to the translation "${paths[paths.length-1] || "Untitled"}"?`,{
               title: "I18N Translator",
               kind: "warning",
               buttons: "YesNoCancel"
          })
          if (confirmation === "Yes") {
               try {
                    const res = files.targetPath ? await FileActions.saveAll(table, files.targetPath, langs, settings.preserveEmpty, settings.xliffPreserveMeta) : await FileActions.saveAs(table, langs, settings.preserveEmpty, settings.xliffPreserveMeta)
                    if (res?.success) {
                         setIsDirty(false)
                         await appWindow.close();
                    }
                    if (res?.error) toast.error("Failed to save translation", {
                         description: res.error,
                         id: "save-error"
                    })
               } catch (err) {
                    toast.error("Failed to save translation", {
                         description: getErrorMessage(err),
                         id: "save-error"
                    })
               }
          }
          if (confirmation === "No") await appWindow.close()
     }
     const handleToggleMaximize = async () => {
          if(hideMaximize) return;
          await appWindow.toggleMaximize();
          setIsMaximized(await appWindow.isMaximized())
     }
     const handleMinimize = async () => await appWindow.minimize()
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
          <div className="flex items-center justify-between gap-2 bg-secondary/80 dark:bg-card/80 text-secondary-foreground border-b shadow-xs pl-2 sticky top-0 left-0 z-30 w-full h-9 backdrop-blur-md">
               <Suspense fallback={<MenubarLoader/>}>
                    <div className="flex items-center gap-2">
                         <LogoDropdown title={title}/>
                         <MenuBar/>
                    </div>
               </Suspense>
               <div
                    data-tauri-drag-region
                    className="flex-1 h-full"
               />
               <ButtonGroup className="[&>[data-slot]:not(:has(~[data-slot]))]:rounded-none! h-full">
                    <Button size="window-control" variant="ghost" title="Minimize" onClick={handleMinimize}><Minus/></Button>
                    {!hideMaximize && (
                         <Button size="window-control" variant="ghost" title={isMaximized ? "Restore Down" : "Maximize"} onClick={handleToggleMaximize}>
                              {isMaximized ? <Copy/> : <Square/>}
                         </Button>
                    )}
                    <Button size="window-control" variant="ghost-destructive" title="Close" onClick={handleClose}><X/></Button>
               </ButtonGroup>
          </div>
     )
}