import { SetStateType } from "@/lib/types"
import { ITranslation } from "@/lib/types/data"
import { getErrorMessage } from "@/lib/utils"
import { BatchRenameKeysSchema, ReplaceTranslationSchema, SpellCheckSchema, TransliterateScriptSchema } from "@/schemas"
import { AutoTranslateSchema } from "@/schemas/auto-translate"
import { AutoTranslateType, BatchRenameKeysType, ReplaceTranslationType, SpellCheckType, TransliterateScriptType } from "@/schemas/types"

export default class TranslatorActions{
     public static autoTranslate(values: AutoTranslateType){
          try {
               const validatedFields = AutoTranslateSchema.safeParse(values)
               if(!validatedFields.success) return {error: "All fields are invalid"}
               console.log(`TODO: Implement ${validatedFields.data.provider} Auto translation using ${JSON.stringify(values,undefined,2)}`)
          } catch (err) {
               console.error(err)
               return {error: getErrorMessage(err)}
          }
     }
     public static hunspellCheck(values: SpellCheckType){
          try {
               const validatedFields = SpellCheckSchema.safeParse(values)
               if(!validatedFields.success) return {error: "All fields are invalid"}
               console.log(`TODO: Implement Spell check (using Hunspell with dictionary: ${validatedFields.data.dictionary})`)
          } catch (err) {
               console.error(err)
               return {error: getErrorMessage(err)}
          }
     }
     public static transliterateScript(values: TransliterateScriptType){
          try {
               const validatedFields = TransliterateScriptSchema.safeParse(values)
               if(!validatedFields.success) return {error: "All fields are invalid"}
               console.log(`TODO: Implement Script transliteration (e.g. ${validatedFields.data.source} to ${validatedFields.data.target})`)
          } catch (err) {
               console.error(err)
               return {error: getErrorMessage(err)}
          }
     }
     public static replaceTranslation(values: ReplaceTranslationType){
          try {
               const validatedFields = ReplaceTranslationSchema.safeParse(values)
               if(!validatedFields.success) return {error: "All fields are invalid", data: []}
               console.log(`TODO: Implement Replace translation Action from ${validatedFields.data.from} to ${validatedFields.data.to}`)
          } catch (err) {
               console.error(err)
               return {error: getErrorMessage(err), data: []}
          }
     }
     public static batchRename(values: BatchRenameKeysType){
          try {
               const validatedFields = BatchRenameKeysSchema.safeParse(values)
               if(!validatedFields.success) return {error: "All fields are invalid", data: []}
               console.log(`TODO: Implement batch rename Action from ${validatedFields.data.from} to ${validatedFields.data.to}`)
          } catch (err) {
               console.error(err)
               return {error: getErrorMessage(err), data: []}
          }
     }
     public static saveString({ input, setTable, currTranslation }: {
          input: string
          setTable: SetStateType<ITranslation[]>,
          currTranslation: ITranslation | null
     }){
          setTable(prev => prev.map(item => item.keyName === currTranslation?.keyName ? {
               ...item,
               translationString: input
          }
          : item))
     }
     public static borrowFromSource(currTranslation: ITranslation | null, onInputChange: (input: string) => void){
          if(!currTranslation) return;
          onInputChange(currTranslation.baseString)
     }
     public static jumpToNextBlankField({ table, currTranslation, onSelectTranslation, setInput }: {
          table: ITranslation[]
          currTranslation: ITranslation | null
          onSelectTranslation: (translation: ITranslation) => void
          setInput: (input: string) => void
     }) {
          const currentIndex = currTranslation ? table.findIndex(item => item.keyName === currTranslation.keyName) : -1
          const next = table.slice(currentIndex + 1).find(item => item.translationString.trim() === "")
          if (!next) return
          onSelectTranslation(next)
          setInput(next.translationString)
     }
     public static jumpToPrevBlankField({ table, currTranslation, onSelectTranslation, setInput }: {
          table: ITranslation[]
          currTranslation: ITranslation | null
          onSelectTranslation: (translation: ITranslation) => void
          setInput: (input: string) => void
     }) {
          const currentIndex = currTranslation ? table.findIndex(item => item.keyName === currTranslation.keyName) : -1
          for (let i = currentIndex - 1; i >= 0; i--) {
               if (table[i].translationString.trim() === "") {
                    onSelectTranslation(table[i])
                    setInput(table[i].translationString)
                    return
               }
          }
     }
     public static jumpToTranslation({
          translation,
          index,
          setCurrentTranslation,
          setInput,
          setVisibleCount,
     }: {
          translation: ITranslation
          index: number
          setCurrentTranslation: (value: ITranslation) => void
          setInput: (value: string) => void
          setVisibleCount: React.Dispatch<React.SetStateAction<number>>
     }) {
          setCurrentTranslation(translation)
          setInput(translation.translationString)
          setVisibleCount(prev => Math.max(prev, index + 1))
          requestAnimationFrame(() => {
               document
                    .getElementById(`row-${translation.keyName}`)
                    ?.scrollIntoView({
                         behavior: "smooth",
                         block: "center",
                    })
          })
     }
     public static compareDiff(){
          console.log("TODO: Implement Compare diff")
     }
     public static validateKeys(){
          console.log("TODO: Implement key validation")
     }
     public static removeUnusedKeys(){
          console.log("TODO: Implement remove unused keys")
     }
}