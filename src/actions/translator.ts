import { SetStateType } from "@/lib/types"
import { ITranslation } from "@/lib/types/data"
import { getErrorMessage } from "@/lib/utils"
import { GoToKeyNameSchema, SpellCheckSchema, TransliterateScriptSchema } from "@/schemas"
import { AutoTranslateSchema } from "@/schemas/auto-translate"
import { AutoTranslateType, GoToKeyNameType, SpellCheckType, TransliterateScriptType } from "@/schemas/types"

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
     public static goToKeyName(values: GoToKeyNameType){
          try {
               const validatedFields = GoToKeyNameSchema.safeParse(values)
               if(!validatedFields.success) return {error: "All fields are invalid"}
               console.log(`TODO: Implement Go to key name and jump into ${validatedFields.data.keyName}`)
          } catch (err) {
               console.error(err)
               return {error: getErrorMessage(err)}
          }
     }
     public static selectUntranslated(){
          console.log("TODO: Implement Select untranslated")
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
     public static jumpToNextBlankField(){
          console.log("TODO: Implement next blank field")
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
}