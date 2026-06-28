export type GlossaryTogglerType = "all" | "few";
export type GlossaryFilterType =
  | "all"
  | "translated"
  | "untranslated"
  | "transEqSrc"
  | "repeatedStr"
  | "caseSensitive"
export type GlossarySearchType = "translation" | "term" | "term-not" | "translation-not" | "domain" | "domain-not" | "part-of-speech"
export type TranslationFilterType =
  | "all"
  | "translated"
  | "untranslated"
  | "transEqSrc"
  | "repeatedStr"
export type TranslationSearchType = "name" | "translation" | "source" | "source-not" | "translation-not" | "name-not"
export type DesignType = "default" | "danger";
export type Popup =
  | "new"
  | "open"
  | "open-xliff"
  | "find"
  | "replace"
  | "batch-rename"
  | "spell-check"
  | "glossary"
  | "add-glossary"
  | "transliterate"
  | "settings"
  | "updater"
  | "about"
  | null