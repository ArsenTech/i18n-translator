import type { SetStateType } from "@/lib/types"
import type { ITranslation } from "@/lib/types/data"
import type { TranslationFormat } from "@/lib/types/enums"
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
     public static replaceTranslation(values: ReplaceTranslationType, table: ITranslation[]){
          try {
               const validatedFields = ReplaceTranslationSchema.safeParse(values)
               if(!validatedFields.success) return {error: "All fields are invalid", data: []}
               const {from, to, caseSensitive} = validatedFields.data
               const data = table.map(val => ({
                    ...val,
                    translationString: caseSensitive
                         ? val.translationString.replaceAll(from, to)
                         : val.translationString.replace(
                              new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),"gi"),
                              to
                         ),
               }))
               return {
                    success: "Translations replaced successfully",
                    data
               }
          } catch (err) {
               console.error(err)
               return {error: getErrorMessage(err), data: []}
          }
     }
     public static batchRename(values: BatchRenameKeysType, table: ITranslation[]){
          try {
               const validatedFields = BatchRenameKeysSchema.safeParse(values)
               if(!validatedFields.success) return {error: "All fields are invalid", data: []}
               const {from, to} = validatedFields.data
               const regex = new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),"gi")
               const data = table.map(val => ({
                    ...val,
                    keyName: val.keyName.replace(regex,to),
               }))
               return {
                    success: "Key names renamed successfully",
                    data
               }
          } catch (err) {
               console.error(err)
               return {error: getErrorMessage(err), data: []}
          }
     }
     public static saveString({ input, setTable, currTranslation, format }: {
          input: string
          setTable: SetStateType<ITranslation[]>,
          currTranslation: ITranslation | null,
          format: TranslationFormat | null
     }){
          setTable(prev => prev.map(item => item.keyName === currTranslation?.keyName ? {
               ...item,
               translationString: !format ? input : format==="json" ? input : String.raw`${input}`
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
     public static compareDiff = (table: ITranslation[]) =>
          table.filter(item => {
               const source = item.baseString.trim()
               const translation = item.translationString.trim()
               return (
                    translation !== "" &&
                    source !== translation
               )
          })
          .map(item => ({
               keyName: item.keyName,
               source: item.baseString,
               translation: item.translationString,
          }))
     public static validateKeys(
          table: ITranslation[],
          baseKeys: Set<string>
     ) {
          const invalid = table.filter(item => !baseKeys.has(item.keyName))
          return {
               success: invalid.length === 0,
               data: invalid,
               count: invalid.length,
          }
     }
     public static removeUnusedKeys(table: ITranslation[], baseKeys: Set<string>) {
          const data = table.filter(item => baseKeys.has(item.keyName))
          const removed = table.length - data.length
          return {
               success: `${removed} unused key${removed === 1 ? "" : "s"} removed`,
               data,
          }
     }
}