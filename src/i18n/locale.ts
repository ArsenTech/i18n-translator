import { useTranslation } from "react-i18next";
import { LangCode } from "./types";
import { useMemo } from "react";

export function useLocale(){
     const {i18n} = useTranslation();
     return useMemo(()=>i18n.language as LangCode,[i18n])
}