import { GLOSSARY_DOMAINS, PARTS_OF_SPEECH, RESOURCE_TYPE, SUPPORTED_SCRIPTS } from "@/lib/constants/items"
import { TranslationFormat } from "@/lib/types/enums"
import * as z from "zod"

const scriptField = z.enum([...SUPPORTED_SCRIPTS.map(s => s.value)],"Choose a Script to transliterate")
const fileFormats: TranslationFormat[] = [
     TranslationFormat.Json,
     TranslationFormat.Xml,
     TranslationFormat.Po,
     TranslationFormat.Resx,
     TranslationFormat.Xliff,
]

export const NewTranslationSchema = z.object({
     path: z.string().min(1,"Please enter the path of the base language file").trim(),
     targetLanguageCode: z.string().min(1,"Please select a target language").trim(),
     format: z.enum([...fileFormats],"Choose the file type of the new translation")
})
export const OpenTranslationSchema = z.object({
     basePath: z.string().min(1,"Please enter the path of the base language file").trim(),
     baseLang: z.string().min(1,"Please select a language of the base file").trim(),
     targetPath: z.string().min(1,"Please enter the path of the translation").trim(),
     targetLang: z.string().min(1,"Please select a language of the translation").trim(),
})
export const OpenXliffSchema = z.object({
     translationPath: z.string().min(1,"Please enter the path of the base language file").trim(),
     baseLang: z.string().min(1,"Please select a language of the base file").trim(),
     targetLang: z.string().min(1,"Please select a language of the translation").trim(),
})
export const FindSchema = z.object({
     query: z.string().min(1,"Please enter the query to find").trim(),
     mode: z.enum(["key","source","translation"],"Choose the search mode"),
     caseSensitive: z.boolean()
})
export const ReplaceTranslationSchema = z.object({
     from: z.string().min(1,"Please enter the translation to replace").trim(),
     to: z.string().min(1,"Please enter the new translation").trim(),
     caseSensitive: z.boolean()
})
export const BatchRenameKeysSchema = z.object({
     from: z.string().min(1,"Please enter the key to replace").trim(),
     to: z.string().min(1,"Please enter the new key name").trim(),
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
export const SpellCheckSchema = z.object({
     dictionary: z.string().min(1,"Please choose the dictionary language").trim(),
     scope: z.enum([...RESOURCE_TYPE.map(s => s.value)], "Select the scope for a spell check")
})
export const AddToGlossarySchema = z.object({
     term: z.string().min(1,"Please add the term on the base language").max(200,"The term is too long"),
     partOfSpeech: z.enum([...PARTS_OF_SPEECH],"Please add the part of speech to the term"),
     domain: z.enum([...GLOSSARY_DOMAINS],"Please select a domain"),
     translation: z.string().min(1,"Please add the translation of this term").max(200,"The translation is too long"),
     caseSensitive: z.boolean()
})