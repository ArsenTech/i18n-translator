import { useIsMobile } from "@/hooks/use-mobile";
import { GlossaryEntry, SetStateType } from "@/lib/types";
import { createContext, useContext, useMemo, useState } from "react"

interface GlossaryContextValues{
     open: boolean,
     setOpen: SetStateType<boolean>,
     isMobile: boolean,
     closeMobileSidebar: () => void,
     glossary: GlossaryEntry[],
     setGlossary: SetStateType<GlossaryEntry[]>
}
const GlossaryContext = createContext<GlossaryContextValues | null>(null)

export function GlossaryProvider({ children }: { children: React.ReactNode }){
     const [glossary, setGlossary] = useState<GlossaryEntry[]>([])
     const [open, setOpen] = useState(true);
     const isMobile = useIsMobile();
     const closeMobileSidebar = () => {
          if (isMobile) setOpen(false)
     }
     const values: GlossaryContextValues = useMemo(()=>({
          open,
          setOpen,
          isMobile,
          closeMobileSidebar,
          glossary, setGlossary
     }),[open, isMobile, glossary])
     return (
          <GlossaryContext.Provider value={values}>
               {children}
          </GlossaryContext.Provider>
     )
}

export function useGlossary(){
     const ctx = useContext(GlossaryContext);
     if (!ctx) {
          throw new Error("useGlossary must be used inside GlossaryProvider");
     }
     return ctx;
}