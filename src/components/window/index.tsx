import { BookOpen, Code, Copy, Grid2X2Plus, Info, MessageCircleWarning, Minus, Settings, Square, X } from "lucide-react"
import { Button } from "../ui/button"
import { ButtonGroup } from "../ui/button-group"
import { getCurrentWindow } from '@tauri-apps/api/window';
import { useEffect, useState } from "react";
import MenuBar from "./menubar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { SiGithub } from "react-icons/si"

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
               <div className="flex items-center justify-between gap-2 bg-secondary/85 dark:bg-muted/80 text-secondary-foreground border-b shadow-xs pl-2 sticky top-0 left-0 z-20 w-full h-9 backdrop-blur-md">
                    <div className="flex items-center gap-2">
                         <DropdownMenu>
                              <DropdownMenuTrigger>
                                   <img src="/logo.png" alt="I18N Translator" width={24} height={24} className="select-none"/> 
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="w-full">
                                   <DropdownMenuItem>
                                        <Info className="text-muted-foreground"/>
                                        About I18N Translator
                                   </DropdownMenuItem>
                                   <DropdownMenuItem>
                                        <Settings className="text-muted-foreground"/>
                                        Settings
                                   </DropdownMenuItem>
                                   <DropdownMenuSeparator/>
                                   <DropdownMenuItem>
                                        <SiGithub className="text-muted-foreground"/>
                                        Github
                                   </DropdownMenuItem>
                                   <DropdownMenuItem>
                                        <BookOpen className="text-muted-foreground"/>
                                        Documentation
                                   </DropdownMenuItem>
                                   <DropdownMenuItem>
                                        <Code className="text-muted-foreground"/>
                                        Contribute
                                   </DropdownMenuItem>
                                   <DropdownMenuSeparator/>
                                   <DropdownMenuItem>
                                        <MessageCircleWarning className="text-muted-foreground"/>
                                        Report a bug
                                   </DropdownMenuItem>
                                   <DropdownMenuItem>
                                        <Grid2X2Plus className="text-muted-foreground"/>
                                        Request a feature
                                   </DropdownMenuItem>
                              </DropdownMenuContent>
                         </DropdownMenu>
                         <MenuBar/>
                    </div>
                    <div
                         data-tauri-drag-region
                         className="flex-1 h-full"
                    />
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