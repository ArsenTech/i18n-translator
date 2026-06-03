import type { SetStateType } from "@/lib/types";
import type { ITranslation } from "@/lib/types/data"
import { createContext, useContext, useMemo, useState } from "react"

interface AppTranslationContextValues{
     missingOnly: boolean,
     setMissingOnly: SetStateType<boolean>,
     table: ITranslation[],
     setTable: SetStateType<ITranslation[]>
}
const AppTranslationContext = createContext<AppTranslationContextValues | null>(null)

export function AppTranslationProvider({ children }: { children: React.ReactNode }){
     const [missingOnly, setMissingOnly] = useState(false);
     const [table, setTable] = useState<ITranslation[]>([])
     const values: AppTranslationContextValues = useMemo(()=>({
          missingOnly,
          setMissingOnly,
          table,
          setTable
     }),[missingOnly, table])
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