import type { SelectType } from "../types";
import { TranslationFormat } from "@/lib/types/enums"

export const NEW_TRANSLATION_FORMATS = ["json", "xml", "xliff","resx"] as const
export const FIND_OPTIONS = ["key", "source", "translation"] as const
export const SUPPORTED_SCRIPTS = ["latin", "cyrillic", "greek", "arabic", "armenian", "georgian", "hebrew", "devanagari", "thai", "hangul"] as const
export const RESOURCE_TYPE = ["key", "namescape", "translation"] as const
export const DEFAULT_DICTIONARIES: SelectType[] = [
     {value: "en", label: "English"},
     {value: "en-us", label: "English (US)"},
     {value: "en-gb", label: "English (UK)"},
     {value: "ru", label: "Русский"},
     {value: "hy", label: "Հայերեն"},
]
export const FILE_FORMATS: TranslationFormat[] = [
     TranslationFormat.Json,
     TranslationFormat.Xml,
     TranslationFormat.Po,
     TranslationFormat.Resx,
     TranslationFormat.Xliff,
]
export const AVAILABLE_SHORTCUTS = ["ctrl++","ctrl+-","ctrl+0","ctrl+s","ctrl+shift+s","ctrl+a","esc","ctrl+enter"] as const
export const ALL_SHORTCUTS = [...AVAILABLE_SHORTCUTS,"alt+f4","ctrl+z","ctrl+y","ctrl+x","ctrl+c","ctrl+v"] as const