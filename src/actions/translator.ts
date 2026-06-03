import { AutoTranslateType, GoToKeyNameType, SpellCheckType, TransliterateScriptType } from "@/schemas/types"

export default class TranslatorActions{
     public static autoTranslate(values: AutoTranslateType){
          console.log(`TODO: Implement ${values.provider} Auto translation using ${JSON.stringify(values,undefined,2)}`)
     }
     public static goToKeyName(values: GoToKeyNameType){
          console.log(`TODO: Implement Go to key name and jump into ${values.keyName}`)
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
          console.log(`TODO: Implement Spell check (using Hunspell with dictionary: ${values.dictionary})`)
     }
     public static transliterateScript(values: TransliterateScriptType){
          console.log(`TODO: Implement Script transliteration (e.g. ${values.source} to ${values.target})`)
     }
     public static jumpToNextBlankField(){
          console.log("TODO: Implement next blank field")
     }
     public static saveString(){
          console.log("TODO: Implement Save string Action")
     }
}