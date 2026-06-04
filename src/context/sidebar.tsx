import { useIsMobile } from "@/hooks/use-mobile";
import { SetStateType } from "@/lib/types";
import { createContext, useContext, useMemo, useState } from "react"

interface TreeSidebarContextValues{
     open: boolean,
     setOpen: SetStateType<boolean>,
     isMobile: boolean,
     closeMobileSidebar: () => void
}
const TreeSidebarContext = createContext<TreeSidebarContextValues | null>(null)

export function TreeSidebarProvider({ children }: { children: React.ReactNode }){
     const [open, setOpen] = useState(true);
     const isMobile = useIsMobile();
     const closeMobileSidebar = () => {
          if (isMobile) setOpen(false)
     }
     const values: TreeSidebarContextValues = useMemo(()=>({
          open,
          setOpen,
          isMobile,
          closeMobileSidebar
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