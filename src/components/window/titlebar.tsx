import { BookOpen, Code, Grid2X2Plus, Info, MessageCircleWarning, Settings } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SiGithub } from "react-icons/si"
import { openUrl } from "@tauri-apps/plugin-opener"
import { createAboutWindow, createSettingsWindow } from "@/lib/window";
import { Copy, Minus, Square, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import MenuBar from "./menubar";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { useState, useEffect } from "react";
import { message } from "@tauri-apps/plugin-dialog";
import { useAppTranslation } from "@/context/translation";
import FileActions from "@/actions/file";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/utils";

interface TitleBarProps{
     hideMenubar?: boolean,
     title?: string,
     hideMaximize?: boolean
}
export default function TitleBar({hideMaximize, hideMenubar, title}: TitleBarProps){
     const appWindow = getCurrentWindow()
     const [isMaximized, setIsMaximized] = useState(false)
     const {isDirty, files, setIsDirty, table} = useAppTranslation()
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
                    const res = files.targetPath ? await FileActions.saveAll(table, files.targetPath) : await FileActions.saveAs(table)
                    if (res?.success) {
                         setIsDirty(false)
                         await appWindow.close();
                    }
                    if (res?.error) toast.error("Failed to save translation", {
                         description: res.error,
                    })
               } catch (err) {
                    toast.error("Failed to save translation", {
                         description: getErrorMessage(err),
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
               <div className="flex items-center gap-2">
                    <DropdownMenu>
                         <DropdownMenuTrigger>
                              <img src="/logo.png" alt="I18N Translator" width={24} height={24} className="select-none"/> 
                         </DropdownMenuTrigger>
                         <DropdownMenuContent className="w-full min-w-32">
                              <DropdownMenuLabel>{title}</DropdownMenuLabel>
                              {!hideMenubar && (
                                   <>
                                   <DropdownMenuSeparator/>
                                   <DropdownMenuItem onClick={()=>createAboutWindow()}>
                                        <Info className="text-muted-foreground"/>
                                        About I18N Translator
                                   </DropdownMenuItem>
                                   <DropdownMenuItem onClick={()=>createSettingsWindow()}>
                                        <Settings className="text-muted-foreground"/>
                                        Settings
                                   </DropdownMenuItem>
                                   </>
                              )}
                              <DropdownMenuSeparator/>
                              <DropdownMenuItem onClick={()=>openUrl("https://github.com/ArsenTech/i18n-translator")}>
                                   <SiGithub className="text-muted-foreground"/>
                                   Github
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={()=>openUrl("https://github.com/ArsenTech/i18n-translator/tree/main/docs")}>
                                   <BookOpen className="text-muted-foreground"/>
                                   Documentation
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={()=>openUrl("https://github.com/ArsenTech/i18n-translator/blob/main/docs/CONTRIBUTING.md")}>
                                   <Code className="text-muted-foreground"/>
                                   Contribute
                              </DropdownMenuItem>
                              <DropdownMenuSeparator/>
                              <DropdownMenuItem onClick={()=>openUrl("https://github.com/ArsenTech/i18n-translator/issues/new?assignees=&labels=&template=bug_report.md&title=")}>
                                   <MessageCircleWarning className="text-muted-foreground"/>
                                   Report a bug
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={()=>openUrl("https://github.com/ArsenTech/i18n-translator/issues/new?assignees=&labels=&template=feature_request.md&title=")}>
                                   <Grid2X2Plus className="text-muted-foreground"/>
                                   Request a feature
                              </DropdownMenuItem>
                         </DropdownMenuContent>
                    </DropdownMenu>
                    {!hideMenubar && (
                         <MenuBar/>
                    )}
               </div>
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