import { useIsMobile } from "@/hooks/use-mobile";
import { SetStateType } from "@/lib/types";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { useSettings } from "./settings";

interface TreeSidebarContextValues{
     open: boolean,
     setOpen: SetStateType<boolean>,
     isMobile: boolean,
     closeMobileSidebar: () => void
}
const TreeSidebarContext = createContext<TreeSidebarContextValues | null>(null)

export function TreeSidebarProvider({ children }: { children: React.ReactNode }){
     const {settings} = useSettings()
     const [open, setOpen] = useState(settings.showSidebar);
     const isMobile = useIsMobile();
     const closeMobileSidebar = useCallback(()=>() => {
          if (isMobile) setOpen(false)
     },[isMobile])
     const values: TreeSidebarContextValues = useMemo(()=>({
          open,
          setOpen,
          isMobile,
          closeMobileSidebar
     }),[open, isMobile])
     useEffect(()=>{
          setOpen(settings.showSidebar)
     },[settings.showSidebar])
     return (
          <TreeSidebarContext.Provider value={values}>
               {children}
          </TreeSidebarContext.Provider>
     )
}

export function useTreeSidebar(){
     const ctx = useContext(TreeSidebarContext);
     if (!ctx) {
          throw new Error("useTreeSidebar must be used inside TreeSidebarProvider");
     }
     return ctx;
}