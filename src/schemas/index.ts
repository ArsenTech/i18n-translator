import { SUPPORTED_SCRIPTS } from "@/lib/constants"
import * as z from "zod"

const scriptField = z.enum([...SUPPORTED_SCRIPTS.map(s => s.value)],"Choose a Script to transliterate")

export const NewTranslationSchema = z.object({
     path: z.string().min(1,"Please enter the path of the base language file").trim(),
     targetLanguageCode: z.string().min(1,"Please select a target language").trim(),
     format: z.enum(["json","xml","po","xliff","resx"],"Choose the file type of the new translation")
})
export const OpenTranslationSchema = z.object({
     basePath: z.string().min(1,"Please enter the path of the base language file").trim(),
     baseLang: z.string().min(1,"Please select a language of the base file").trim(),
     targetPath: z.string().min(1,"Please enter the path of the translation").trim(),
     targetLang: z.string().min(1,"Please select a language of the translation").trim(),
})
export const FindSchema = z.object({
     query: z.string().min(1,"Please enter the query to find"),
     mode: z.enum(["key","source","translation"],"Choose the search mode"),
     caseSensitive: z.boolean()
})
export const ReplaceTranslationSchema = z.object({
     from: z.string().min(1,"Please enter the translation to replace"),
     to: z.string().min(1,"Please enter the new translation"),
     caseSensitive: z.boolean()
})
export const GoToKeyNameSchema = z.object({
     keyName: z.string().min(1,"Enter the key name")
})
export const BatchRenameKeysSchema = z.object({
     from: z.string().min(1,"Please enter the key to replace"),
     to: z.string().min(1,"Please enter the new key name"),
})
export const TransliterateScriptSchema = z.object({
     source: scriptField,
     target: scriptField,
}).refine(
     data => data.source !== data.target,
     {
          path: ["target"],
          message: "Source and target scripts must be different"
     }
)