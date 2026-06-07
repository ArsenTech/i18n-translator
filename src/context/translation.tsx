import { FindState } from "@/actions/find";
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
     visibleTable: ITranslation[],
     setTable: SetStateType<ITranslation[]>,
     currTranslation: ITranslation | null
     setCurrentTranslation: SetStateType<ITranslation | null>,
     langs: ILangInputState,
     updateLangs: (overrides: Partial<ILangInputState>) => void,
     files: TranslationFiles
     setFiles: SetStateType<TranslationFiles>,
     keyNames: string[],
     visibleCount: number,
     setVisibleCount: SetStateType<number>,
     selectedNamespace: string,
     setSelectedNamespace: SetStateType<string>
     input: string,
     setInput: SetStateType<string>
     findState: FindState | null
     setFindState: SetStateType<FindState | null>
}
const AppTranslationContext = createContext<AppTranslationContextValues | null>(null)

export function AppTranslationProvider({ children, initialLimit=100 }: { children: React.ReactNode, initialLimit?: number }){
     const [missingOnly, setMissingOnly] = useState(false);
     const [table, setTable] = useState<ITranslation[]>([])
     const [currTranslation, setCurrentTranslation] = useState<ITranslation | null>(null)
     const [langs, setLangs] = useState<ILangInputState>({
          base: "",
          target: ""
     })
     const [files, setFiles] = useState<TranslationFiles>({
          basePath: "",
          targetPath: ""
     })
     const [visibleCount, setVisibleCount] = useState(initialLimit)
     const [selectedNamespace, setSelectedNamespace] = useState<string>("")
     const [input, setInput] = useState("")
     const [findState, setFindState] = useState<FindState | null>(null)
     const updateLangs = (overrides: Partial<ILangInputState>) => setLangs(prev=>({
          ...prev,
          ...overrides
     }))
     const visibleTable = useMemo(() => {
          if (!selectedNamespace) return table
          if (selectedNamespace === "__general") return table.filter(item => !item.keyName.includes("."))
          return table.filter(item =>item.keyName.startsWith(`${selectedNamespace}.`))
     }, [selectedNamespace, table])
     const keyNames = useMemo(() => visibleTable.map(val => val.keyName),[visibleTable])
     const values: AppTranslationContextValues = useMemo(()=>({
          missingOnly, setMissingOnly,
          table, setTable,
          currTranslation, setCurrentTranslation,
          langs, updateLangs,
          files, setFiles,
          visibleCount, setVisibleCount,
          selectedNamespace, setSelectedNamespace,
          input, setInput,
          findState, setFindState,
          visibleTable, keyNames
     }),[missingOnly, table, currTranslation, langs, files, visibleCount, selectedNamespace, input, visibleTable, keyNames, findState])
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