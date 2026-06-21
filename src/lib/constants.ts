import { IUpdaterState } from "./types"
import { UpdaterStatus } from "./types/enums"

export const PROVIDER_NAMES = {
     "google-translate": "Google Translate",
     gemini: "Google Gemini",
     libretranslate: "Libre Translate",
     "llama-ai": "Llama AI",
} as const
export const SUPPORTED_SCRIPTS = [
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
] as const
export const RESOURCE_TYPE = [
     { value: "key", label: "Selected Key"},
     { value: "namescape", label: "Current Namescape"},
     { value: "translation", label: "Entire Translation"},
] as const
export const SIDEBAR_WIDTH_MOBILE = "18rem"

export const DEFAULT_DICTIONARIES = [
     {value: "en", label: "English"},
     {value: "en-us", label: "English (US)"},
     {value: "en-gb", label: "English (UK)"},
     {value: "ru", label: "Русский"},
     {value: "hy", label: "Հայերեն"},
]
export const PARTS_OF_SPEECH = ["noun", "pronoun", "adjective", "verb", "adverb", "preposition", "conjunction", "interjection"] as const
export const GLOSSARY_DOMAINS = [
     "General",
     "Programming",
     "Gaming",
     "Editing",
     "Design",
     "Security",
     "Networking",
     "Database",
     "Web",
     "Mobile",
     "AI",
     "Office",
     "Science",
     "Medical",
     "Finance",
] as const;
export const INITIAL_UPDATER_STATE: IUpdaterState = {
     status: UpdaterStatus.Checking,
     newVersion: null,
     patchDate: null,
     downloaded: 0,
     total: 0
}