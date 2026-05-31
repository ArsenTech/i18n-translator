import * as z from "zod"
import { BatchRenameKeysSchema, FindSchema, GoToKeyNameSchema, NewTranslationSchema, OpenTranslationSchema, ReplaceTranslationSchema, TransliterateScriptSchema } from "."
import { AutoTranslateSchema, providerField } from "./auto-translate"

export type NewTranslationType = z.infer<typeof NewTranslationSchema>
export type OpenTranslationType = z.infer<typeof OpenTranslationSchema>
export type FindType = z.infer<typeof FindSchema>
export type ReplaceTranslationType = z.infer<typeof ReplaceTranslationSchema>
export type GoToKeyNameType = z.infer<typeof GoToKeyNameSchema>
export type BatchRenameKeysType = z.infer<typeof BatchRenameKeysSchema>
export type AutoTranslateType = z.infer<typeof AutoTranslateSchema>
export type AutoTranslateProvider = z.infer<typeof providerField>
export type TransliterateScriptType = z.infer<typeof TransliterateScriptSchema>