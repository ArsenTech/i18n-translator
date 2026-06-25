import type { ILangInputState, SetStateType } from "@/lib/types";
import type { ITranslation } from "@/lib/types/data"
import { TranslationFormat } from "@/lib/types/enums";
import { createContext, useCallback, useContext, useMemo, useState } from "react"
import { useSettings } from "./settings";
import { RecentTranslation } from "@/lib/store/recent-translations";
import { useEditor } from "./editor";

interface TranslationFiles {
     basePath: string
     targetPath: string,
     format: TranslationFormat | null
}
interface AppTranslationContextValues{
     table: ITranslation[]
     visibleTable: ITranslation[]
     setTable: SetStateType<ITranslation[]>

     baseKeys: Set<string>
     setBaseKeys: SetStateType<Set<string>>

     langs: ILangInputState
     updateLangs: (overrides: Partial<ILangInputState>) => void

     files: TranslationFiles
     setFiles: SetStateType<TranslationFiles>

     keyNames: string[]

     isDirty: boolean
     setIsDirty: SetStateType<boolean>

     recentTranslations: RecentTranslation[]
     setRecentTranslations: SetStateType<RecentTranslation[]>

     reset: () => void
}
const AppTranslationContext = createContext<AppTranslationContextValues | null>(null)

export function AppTranslationProvider({ children }: { children: React.ReactNode }){
     const {settings} = useSettings()
     const {selectedNamespace} = useEditor()
     const [table, setTable] = useState<ITranslation[]>([])
     const [langs, setLangs] = useState<ILangInputState>({
          base: settings.baseLang ?? "",
          target: settings.targetLang ?? ""
     })
     const [files, setFiles] = useState<TranslationFiles>({
          basePath: "",
          targetPath: "",
          format: null
     })
     const [baseKeys, setBaseKeys] = useState<Set<string>>(new Set())
     const [isDirty, setIsDirty] = useState(false)
     const [recentTranslations, setRecentTranslations] = useState<RecentTranslation[]>([])
     const updateLangs = useCallback((overrides: Partial<ILangInputState>) => setLangs(prev=>({
          ...prev,
          ...overrides
     })),[])
     const visibleTable = useMemo(() => {
          if (!selectedNamespace) return table
          if (selectedNamespace === "__general") return table.filter(item => !item.keyName.includes("."))
          return table.filter(item =>item.keyName.startsWith(`${selectedNamespace}.`))
     }, [selectedNamespace, table])
     const keyNames = useMemo(() => visibleTable.map(val => val.keyName),[visibleTable])
     const reset = useCallback(()=>{
          setTable([]);
          updateLangs({
               base: settings.baseLang ?? "",
               target: settings.targetLang ?? ""
          });
          setFiles({
               basePath: "",
               targetPath: "",
               format: null
          });
          setBaseKeys(new Set());
          setIsDirty(false);
     },[settings.baseLang, settings.targetLang])
     const values: AppTranslationContextValues = useMemo(()=>({
          table, setTable,
          langs, updateLangs,
          files, setFiles,
          baseKeys, setBaseKeys,
          visibleTable, keyNames,
          isDirty, setIsDirty, reset,
          recentTranslations, setRecentTranslations
     }),[table, langs, files, selectedNamespace, visibleTable, keyNames, baseKeys, isDirty, recentTranslations, settings.baseLang, settings.targetLang])
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