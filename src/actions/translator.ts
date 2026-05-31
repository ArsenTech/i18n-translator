import { cache } from "react"

export default class TranslatorActions{
     public static autoTranslate(type: "google-translate" | "gemini" | "libretranslate" | "llama-ai", apiKey?: string){
          console.log(`TODO: Implement ${type} Auto translation using ${apiKey}`)
     }
     public static goToProp(){
          console.log("TODO: Implement Go to prop name")
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
     public static hunspellCheck(){
          console.log("TODO: Implement Spell check (using Hunspell)")
     }
     public static transliterateScript(){
          console.log("TODO: Implement Script transliteration (e.g. Latin to Cyrillic)")
     }
     public static jumpToNextBlankField(){
          console.log("TODO: Implement next blank field")
     }
     public static saveString(){
          console.log("TODO: Implement Save string Action")
     }
     public static fetchLanguages = cache(async()=>{
          const res = await fetch("/lang-list.json");
          if (!res.ok) throw new Error("Failed to fetch the data")
          const resData: {
               flag: string,
               name: string,
               code: string,
               type: "country" | "language"
          }[] = await res.json();
          return resData.sort(({name: a},{name: b})=>a>b ? 1 : a<b ? -1 : 0)
     })
     public static toggleMissing(){
          console.log("TODO: Toggle Missing Translations")
     }
}