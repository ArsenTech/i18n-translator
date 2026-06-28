import { lazy, Suspense } from "react";
import { MenubarLoader } from "../../loaders/titlebar";
import { Skeleton } from "../ui/skeleton";

const LogoDropdown = lazy(()=>import("./logo-dropdown"));
const MenuBar = lazy(()=>import("./menubar"))
const WindowControl = lazy(()=>import("./controls"))

interface TitleBarProps{
     title?: string
}
export default function TitleBar({title}: TitleBarProps){
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
               <Suspense fallback={<Skeleton className="h-9 w-[108px]"/>}>
                    <WindowControl/>
               </Suspense>
          </div>
     )
}