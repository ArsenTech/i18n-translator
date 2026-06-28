import { FindState } from "@/actions/find";
import type { SetStateType } from "@/lib/types";
import type { ITranslation } from "@/lib/types/data"
import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react"
import { useSettings } from "./settings";

interface EditorContextValues{
     currTranslation: ITranslation | null
     setCurrentTranslation: SetStateType<ITranslation | null>

     input: string
     setInput: SetStateType<string>

     selectedNamespace: string
     setSelectedNamespace: SetStateType<string>

     visibleCount: number
     setVisibleCount: SetStateType<number>

     missingOnly: boolean
     setMissingOnly: SetStateType<boolean>

     findState: FindState | null
     setFindState: SetStateType<FindState | null>

     selectedKeys: Set<string>
     setSelectedKeys: SetStateType<Set<string>>
     selectKey: (key: string) => void

     inputRef: React.RefObject<HTMLTextAreaElement | null>
     resetEditor: () => void

     openCommand: boolean,
     setOpenCommand: SetStateType<boolean>
}
const EditorContext = createContext<EditorContextValues | null>(null)

export function EditorProvider({ children, initialLimit=100 }: { children: React.ReactNode, initialLimit?: number }){
     const {settings} = useSettings()
     const [currTranslation, setCurrentTranslation] = useState<ITranslation | null>(null)
     const [input, setInput] = useState("")
     const [selectedNamespace, setSelectedNamespace] = useState<string>("")
     const [visibleCount, setVisibleCount] = useState(initialLimit)
     const [missingOnly, setMissingOnly] = useState(false);
     const [findState, setFindState] = useState<FindState | null>(null)
     const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set())
     const [openCommand, setOpenCommand] = useState(false)
     const inputRef = useRef<HTMLTextAreaElement>(null)
     const selectKey = useCallback((key: string) => setSelectedKeys(prev => {
          const next = new Set(prev)
          if (next.has(key)) {
               next.delete(key)
          } else {
               next.add(key)
          }
          return next
     }),[])
     const resetEditor = useCallback(()=>{
          setMissingOnly(false);
          setCurrentTranslation(null);
          setVisibleCount(initialLimit);
          setSelectedNamespace("");
          setInput("");
          setFindState(null);
          setSelectedKeys(new Set());
     },[settings.baseLang, settings.targetLang])
     const values: EditorContextValues = useMemo(()=>({
          missingOnly, setMissingOnly,
          currTranslation, setCurrentTranslation,
          visibleCount, setVisibleCount,
          selectedNamespace, setSelectedNamespace,
          input, setInput,
          findState, setFindState, resetEditor,
          inputRef, selectedKeys, setSelectedKeys, selectKey,
          openCommand, setOpenCommand
     }),[missingOnly, currTranslation, visibleCount, selectedNamespace, input, findState, selectedKeys, settings.baseLang, settings.targetLang, openCommand])
     return (
          <EditorContext.Provider value={values}>
               {children}
          </EditorContext.Provider>
     )
}

export function useEditor(){
     const ctx = useContext(EditorContext);
     if (!ctx) {
          throw new Error("useEditor must be used inside EditorProvider");
     }
     return ctx;
}