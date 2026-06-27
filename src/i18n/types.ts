import { ParseKeys } from "i18next";

export type LangCode = "en" | "hy" | "ru"
export type CountryCode = "us" | "am" | "ru"
export type LanguageOption = { language: string; code: LangCode, countryCode: CountryCode };
export type AllLangCode = ParseKeys<"languages">