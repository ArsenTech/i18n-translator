import type { SelectType } from "../types";
import { TranslationFormat } from "@/lib/types/enums"

export const NEW_TRANSLATION_FORMATS: SelectType[] = [
     {value: "json", label: "JSON File"},
     {value: "xml", label: "XML File"},
     {value: "po", label: "GNU gettext"},
     {value: "xliff", label: "XLIFF File"},
     {value: "resx", label: "Microsoft RESX File"}
]
export const FIND_OPTIONS: SelectType[] = [
     {value: "key", label: "Key"},
     {value: "source", label: "Source"},
     {value: "translation", label: "Translation"},
]
export const SUPPORTED_SCRIPTS: SelectType[] = [
     { value: "latin", label: "Latin" },
     { value: "cyrillic", label: "Cyrillic (Кириллица)" },
     { value: "greek", label: "Greek (Ελληνικά)" },
     { value: "arabic", label: "Arabic (عربي)" },
     { value: "armenian", label: "Armenian (Հայերեն)" },
     { value: "georgian", label: "Georgian (ქართული)" },
     { value: "hebrew", label: "Hebrew (עִבְרִית)" },
     { value: "devanagari", label: "Devanagari (देवनागरी)" },
     { value: "thai", label: "Thai (ไทย)" },
     { value: "hangul", label: "Korean (한글)" }
]
export const RESOURCE_TYPE: SelectType[] = [
     { value: "key", label: "Selected Key"},
     { value: "namescape", label: "Current Namescape"},
     { value: "translation", label: "Entire Translation"},
]
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