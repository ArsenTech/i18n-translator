import { ITranslation } from "./types";

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

// TODO: Replace with a real data
export const DEFAULT_DICTIONARIES = [
     {value: "en", label: "English"},
     {value: "en-us", label: "English (US)"},
     {value: "en-gb", label: "English (UK)"},
     {value: "ru", label: "Русский"},
     {value: "hy", label: "Հայերեն"},
]

// TODO: Replace with a real data
export const mockupData: ITranslation[] = [
     {
          keyName: "greeting",
          baseString: "Hi",
          translationString: "Բարև",
          lineNumber: 2
     },
     {
          keyName: "whatsUp",
          baseString: "What's Up?",
          translationString: "Ինչպե՞ս ես",
          lineNumber: 3
     },
     {
          keyName: "bye",
          baseString: "Bye",
          translationString: "Ցտեսություն",
          lineNumber: 4
     },
     {
          keyName: "yes",
          baseString: "Yes",
          translationString: "Այո",
          lineNumber: 5
     },
     {
          keyName: "no",
          baseString: "No",
          translationString: "Ոչ",
          lineNumber: 6
     },
     {
          keyName: "test",
          baseString: "Test",
          translationString: "Test",
          lineNumber: 7
     },
     {
          keyName: "no",
          baseString: "No",
          translationString: "",
          lineNumber: 8
     },
     {
          keyName: "common.buttons.save",
          baseString: "Save",
          translationString: "Պահպանել",
          lineNumber: 11
     },
     {
          keyName: "common.buttons.cancel",
          baseString: "Cancel",
          translationString: "Չեղարկել",
          lineNumber: 12
     },
]