import { SetStateType } from "@/lib/types";
import { createContext, useContext, useMemo, useState } from "react"

interface AppTranslationContextValues{
     missingOnly: boolean,
     setMissingOnly: SetStateType<boolean>
}
const AppTranslationContext = createContext<AppTranslationContextValues | null>(null)

export function AppTranslationProvider({ children }: { children: React.ReactNode }){
     const [missingOnly, setMissingOnly] = useState(false);
     const values: AppTranslationContextValues = useMemo(()=>({
          missingOnly,
          setMissingOnly
     }),[missingOnly])
     return (
          <AppTranslationContext.Provider value={values}>
               {children}
          </AppTranslationContext.Provider>
     )
}

export function useAppTranslation(){
     const ctx = useContext(AppTranslationContext);
     if (!ctx) {
          throw new Error("useAppTranslation must be used inside AppTranslationProvider");
     }
     return ctx;
}