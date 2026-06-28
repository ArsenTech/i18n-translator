import { useAppTranslation } from "@/context/translation";
import { lazy, Suspense } from "react";
import { Skeleton } from "../ui/skeleton";
import { Trans, useTranslation } from "react-i18next";
import React from "react";

const LangSelector = lazy(()=>import("@/components/fields/lang-selector"))

function LanguageSelect(){
     const {t} = useTranslation("translation",{
          keyPrefix: "lang-select"
     })
     const {langs, updateLangs} = useAppTranslation()
     return (
          <div className="flex items-center gap-2">
               <Trans
                    ns="translation"
                    i18nKey="lang-select.layout"
                    components={{
                         baseInput: (
                              <Suspense fallback={<Skeleton className="h-8 flex-1"/>}>
                                   <LangSelector
                                        placeholder={t("base-placeholder")}
                                        className="flex-1"
                                        value={langs.base}
                                        onChange={lang=>updateLangs({base: lang})}
                                   />
                              </Suspense>
                         ),
                         targetInput: (
                              <Suspense fallback={<Skeleton className="h-8 flex-1"/>}>
                                   <LangSelector
                                        placeholder={t("target-placeholder")}
                                        className="flex-1"
                                        value={langs.target}
                                        onChange={lang=>updateLangs({target: lang})}
                                   />
                              </Suspense>
                         )
                    }}
               />
          </div>
     )
}

export default React.memo(LanguageSelect)