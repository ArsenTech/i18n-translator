import type { ILangInputState, SetStateType } from "@/lib/types";
import type { ITranslation } from "@/lib/types/data"
import { createContext, useContext, useMemo, useState } from "react"

interface TranslationFiles {
     basePath: string
     targetPath: string
}

interface AppTranslationContextValues{
     missingOnly: boolean,
     setMissingOnly: SetStateType<boolean>,
     table: ITranslation[],
     setTable: SetStateType<ITranslation[]>,
     currTranslation: ITranslation | null
     setCurrentTranslation: SetStateType<ITranslation | null>,
     langs: ILangInputState,
     updateLangs: (overrides: Partial<ILangInputState>) => void,
     files: TranslationFiles
     setFiles: SetStateType<TranslationFiles>
}
const AppTranslationContext = createContext<AppTranslationContextValues | null>(null)

export function AppTranslationProvider({ children }: { children: React.ReactNode }){
     const [missingOnly, setMissingOnly] = useState(false);
     const [currTranslation, setCurrentTranslation] = useState<ITranslation | null>(null)
     const [langs, setLangs] = useState<ILangInputState>({
          base: "",
          target: ""
     })
     const [files, setFiles] = useState<TranslationFiles>({
          basePath: "",
          targetPath: ""
     })
     const updateLangs = (overrides: Partial<ILangInputState>) => setLangs(prev=>({
          ...prev,
          ...overrides
     }))
     const [table, setTable] = useState<ITranslation[]>([])
     const values: AppTranslationContextValues = useMemo(()=>({
          missingOnly, setMissingOnly,
          table, setTable,
          currTranslation, setCurrentTranslation,
          langs, updateLangs,
          files, setFiles
     }),[missingOnly, table, currTranslation, langs, files])
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