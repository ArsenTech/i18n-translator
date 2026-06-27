import * as z from "zod"
import { getAddToGlossarySchema, getBatchRenameKeysSchema, getFindSchema, getNewTranslationSchema, getOpenTranslationSchema, getOpenXliffSchema, getReplaceTranslationSchema, getSpellCheckSchema, getTransliterateScriptSchema } from "."
import { getAutoTranslateSchema, providerField } from "./auto-translate"

export type AutoTranslateProvider = z.infer<typeof providerField>

export type NewTranslationType = z.infer<
     Awaited<ReturnType<typeof getNewTranslationSchema>>
>
export type OpenTranslationType = z.infer<
     Awaited<ReturnType<typeof getOpenTranslationSchema>>
>
export type FindType = z.infer<
     Awaited<ReturnType<typeof getFindSchema>>
>
export type ReplaceTranslationType = z.infer<
     Awaited<ReturnType<typeof getReplaceTranslationSchema>>
>
export type BatchRenameKeysType = z.infer<
     Awaited<ReturnType<typeof getBatchRenameKeysSchema>>
>
export type AutoTranslateType = z.infer<
     Awaited<ReturnType<typeof getAutoTranslateSchema>>
>
export type TransliterateScriptType = z.infer<
     Awaited<ReturnType<typeof getTransliterateScriptSchema>>
>
export type SpellCheckType = z.infer<
     Awaited<ReturnType<typeof getSpellCheckSchema>>
>
export type OpenXliffType = z.infer<
     Awaited<ReturnType<typeof getOpenXliffSchema>>
>
export type AddToGlossaryType = z.infer<
     Awaited<ReturnType<typeof getAddToGlossarySchema>>
>