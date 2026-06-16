import { useIsMobile } from "@/hooks/use-mobile";
import { SetStateType } from "@/lib/types";
import { createContext, useContext, useMemo, useState } from "react"

interface GlossarySidebarContextValues{
     open: boolean,
     setOpen: SetStateType<boolean>,
     isMobile: boolean,
     closeMobileSidebar: () => void
}
const GlossarySidebarContext = createContext<GlossarySidebarContextValues | null>(null)

export function GlossarySidebarProvider({ children }: { children: React.ReactNode }){
     const [open, setOpen] = useState(true);
     const isMobile = useIsMobile();
     const closeMobileSidebar = () => {
          if (isMobile) setOpen(false)
     }
     const values: GlossarySidebarContextValues = useMemo(()=>({
          open,
          setOpen,
          isMobile,
          closeMobileSidebar
     }),[open, isMobile])
     return (
          <GlossarySidebarContext.Provider value={values}>
               {children}
          </GlossarySidebarContext.Provider>
     )
}

export function useGlossarySidebar(){
     const ctx = useContext(GlossarySidebarContext);
     if (!ctx) {
          throw new Error("useGlossarySidebar must be used inside GlossarySidebarProvider");
     }
     return ctx;
}