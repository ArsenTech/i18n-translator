import { FindState } from "@/actions/find";
import type { ILangInputState, SetStateType } from "@/lib/types";
import type { ITranslation } from "@/lib/types/data"
import { TranslationFormat } from "@/lib/types/enums";
import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react"

interface TranslationFiles {
     basePath: string
     targetPath: string,
     format: TranslationFormat | null
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
     setFindState: SetStateType<FindState | null>,
     baseKeys: Set<string>,
     setBaseKeys: SetStateType<Set<string>>,
     isDirty: boolean,
     setIsDirty: SetStateType<boolean>,
     inputRef: React.RefObject<HTMLTextAreaElement | null>,
     selectedKeys: Set<string>,
     setSelectedKeys: SetStateType<Set<string>>,
     selectKey: (key: string) => void,
     reset: () => void
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
          targetPath: "",
          format: null
     })
     const [visibleCount, setVisibleCount] = useState(initialLimit)
     const [selectedNamespace, setSelectedNamespace] = useState<string>("")
     const [input, setInput] = useState("")
     const [findState, setFindState] = useState<FindState | null>(null)
     const [baseKeys, setBaseKeys] = useState<Set<string>>(new Set())
     const [isDirty, setIsDirty] = useState(false)
     const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set())
     const inputRef = useRef<HTMLTextAreaElement>(null)
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
     const selectKey = useCallback((key: string) => setSelectedKeys(prev => {
          const next = new Set(prev)
          if (next.has(key)) {
               next.delete(key)
          } else {
               next.add(key)
          }
          return next
     }),[])
     const reset = useCallback(()=>{
          setMissingOnly(false);
          setTable([]);
          setCurrentTranslation(null);
          updateLangs({
               base: "", target: ""
          });
          setFiles({
               basePath: "",
               targetPath: "",
               format: null
          });
          setVisibleCount(initialLimit);
          setSelectedNamespace(""),
          setInput(""),
          setFindState(null),
          setBaseKeys(new Set()),
          setIsDirty(false),
          setSelectedKeys(new Set())
     },[])
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
          baseKeys, setBaseKeys,
          visibleTable, keyNames,
          isDirty, setIsDirty, inputRef,
          selectedKeys, setSelectedKeys, selectKey, reset
     }),[missingOnly, table, currTranslation, langs, files, visibleCount, selectedNamespace, input, visibleTable, keyNames, findState, baseKeys, isDirty, selectedKeys])
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