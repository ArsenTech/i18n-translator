import { PARTS_OF_SPEECH, GLOSSARY_DOMAINS } from "@/lib/constants/combobox-items"
import { FILE_FORMATS, RESOURCE_TYPE, SUPPORTED_SCRIPTS, FIND_OPTIONS } from "@/lib/constants/items"
import type { TFunction } from "i18next"
import * as z from "zod"

const scriptField = (t: TFunction<"validation">) => z.enum([...SUPPORTED_SCRIPTS],t("transliteration.required"))

export const getNewTranslationSchema = (t: TFunction<"validation">) => z.object({
     path: z.string().min(1,t("paths.base")).trim(),
     targetLanguageCode: z.string().min(1,t("languages.target")).trim(),
     format: z.enum([...FILE_FORMATS],t("file-type"))
})
export const getOpenTranslationSchema = (t: TFunction<"validation">) => z.object({
     basePath: z.string().min(1,t("paths.base")).trim(),
     baseLang: z.string().min(1,t("languages.base")).trim(),
     targetPath: z.string().min(1,t("paths.target")).trim(),
     targetLang: z.string().min(1,t("languages.target")).trim(),
})
export const getOpenXliffSchema = (t: TFunction<"validation">) => z.object({
     translationPath: z.string().min(1,t("paths.base")).trim(),
     baseLang: z.string().min(1,t("languages.base")).trim(),
     targetLang: z.string().min(1,t("languages.target")).trim(),
})
export const getFindSchema = (t: TFunction<"validation">) => z.object({
     query: z.string().min(1,t("search.query")).trim(),
     mode: z.enum([...FIND_OPTIONS],t("search.mode")),
     caseSensitive: z.boolean()
})
export const getReplaceTranslationSchema = (t: TFunction<"validation">) => z.object({
     from: z.string().min(1,t("replace.from")).trim(),
     to: z.string().min(1,t("replace.to")).trim(),
     caseSensitive: z.boolean()
})
export const getBatchRenameKeysSchema = (t: TFunction<"validation">) => z.object({
     from: z.string().min(1,t("batch-rename.from")).trim(),
     to: z.string().min(1,t("batch-rename.to")).trim(),
})
export const getTransliterateScriptSchema = (t: TFunction<"validation">) => z.object({
     source: scriptField(t),
     target: scriptField(t),
}).refine(
     data => data.source !== data.target,
     {
          path: ["target"],
          message: t("transliteration.should-be-different")
     }
)
export const getSpellCheckSchema = (t: TFunction<"validation">) => z.object({
     dictionary: z.string().min(1,t("spell-check.dict")).trim(),
     scope: z.enum([...RESOURCE_TYPE],t("spell-check.scope"))
})
export const getAddToGlossarySchema = (t: TFunction<"validation">) => z.object({
     term: z.string().min(1,t("add-to-glossary.term.required")).max(200,t("add-to-glossary.term.too-long")),
     partOfSpeech: z.enum([...PARTS_OF_SPEECH],t("add-to-glossary.part-of-speech")),
     domain: z.enum([...GLOSSARY_DOMAINS],t("add-to-glossary.domain")),
     translation: z.string().min(1,t("add-to-glossary.translation.required")).max(200,t("add-to-glossary.translation.too-long")),
     caseSensitive: z.boolean()
})
const GlossaryEntry = z.object({
     term: z.string().max(200),
     translation: z.string().max(200),
     partOfSpeech: z.enum([...PARTS_OF_SPEECH]),
     domain: z.string().max(200),
     caseSensitive: z.boolean()
})
export const GlossaryEntriesSchema = z.array(GlossaryEntry)