import { useIsMobile } from "@/hooks/use-mobile";
import type { GlossaryEntry } from "@/lib/types/data"
import type { SetStateType, GlossaryTogglerType } from "@/lib/types";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { useSettings } from "./settings";

interface GlossaryContextValues{
     open: boolean,
     setOpen: SetStateType<boolean>,
     isMobile: boolean,
     closeMobileSidebar: () => void,
     glossary: GlossaryEntry[],
     setGlossary: SetStateType<GlossaryEntry[]>,
     showType: GlossaryTogglerType,
     setShowType: SetStateType<GlossaryTogglerType>,
     currEntry: GlossaryEntry | null,
     setCurrentEntry: SetStateType<GlossaryEntry | null>
     visibleCount: number,
     setVisibleCount: SetStateType<number>
     input: string,
     setInput: SetStateType<string>
}
const GlossaryContext = createContext<GlossaryContextValues | null>(null)

export function GlossaryProvider({ children }: { children: React.ReactNode }){
     const [glossary, setGlossary] = useState<GlossaryEntry[]>([])
     const {settings} = useSettings()
     const [open, setOpen] = useState(settings.showGlossary);
     const [currEntry, setCurrentEntry] = useState<GlossaryEntry | null>(null)
     const [visibleCount, setVisibleCount] = useState(50)
     const [input, setInput] = useState("")
     const [showType, setShowType] = useState<GlossaryTogglerType>(settings.defaultGlossaryView)
     const isMobile = useIsMobile();
     const closeMobileSidebar = useCallback(()=>() => {
          if (isMobile) setOpen(false)
     },[isMobile])
     useEffect(()=>{
          setOpen(settings.showGlossary)
     },[settings.showGlossary])
     const values: GlossaryContextValues = useMemo(()=>({
          open, setOpen,
          isMobile, closeMobileSidebar,
          glossary, setGlossary,
          showType, setShowType,
          currEntry, setCurrentEntry,
          visibleCount, setVisibleCount,
          input, setInput
     }),[open, isMobile, glossary, showType, currEntry, visibleCount, input])
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