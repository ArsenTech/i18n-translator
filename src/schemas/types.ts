import * as z from "zod"
import { BatchRenameKeysSchema, FindSchema, NewTranslationSchema, OpenTranslationSchema, ReplaceTranslationSchema, SpellCheckSchema, TransliterateScriptSchema } from "."
import { AutoTranslateSchema, providerField } from "./auto-translate"

export type NewTranslationType = z.infer<typeof NewTranslationSchema>
export type OpenTranslationType = z.infer<typeof OpenTranslationSchema>
export type FindType = z.infer<typeof FindSchema>
export type ReplaceTranslationType = z.infer<typeof ReplaceTranslationSchema>
export type BatchRenameKeysType = z.infer<typeof BatchRenameKeysSchema>
export type AutoTranslateType = z.infer<typeof AutoTranslateSchema>
export type AutoTranslateProvider = z.infer<typeof providerField>
export type TransliterateScriptType = z.infer<typeof TransliterateScriptSchema>
export type SpellCheckType = z.infer<typeof SpellCheckSchema>