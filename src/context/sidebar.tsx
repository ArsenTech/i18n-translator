import { useIsMobile } from "@/hooks/use-mobile";
import React, { useContext, useMemo, useState } from "react"

interface TreeSidebarContextValues{
     open: boolean,
     setOpen: React.Dispatch<React.SetStateAction<boolean>>,
     isMobile: boolean
}
const TreeSidebarContext = React.createContext<TreeSidebarContextValues | null>(null)

export function TreeSidebarProvider({ children }: { children: React.ReactNode }){
     const [open, setOpen] = useState(false);
     const isMobile = useIsMobile()
     const values: TreeSidebarContextValues = useMemo(()=>({
          open,
          setOpen,
          isMobile
     }),[open, isMobile])
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