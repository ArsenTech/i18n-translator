import { useIsMobile } from "@/hooks/use-mobile";
import { SetStateType } from "@/lib/types";
import { createContext, useContext, useMemo, useState } from "react"

interface TreeSidebarContextValues{
     open: boolean,
     setOpen: SetStateType<boolean>,
     isMobile: boolean
}
const TreeSidebarContext = createContext<TreeSidebarContextValues | null>(null)

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