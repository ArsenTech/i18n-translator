import { CommandItem } from "@/components/ui/command"
import { Skeleton } from "@/components/ui/skeleton";
import type { ILangItem } from "@/lib/types/data"
import { lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";

const LangIcon = lazy(()=>import("@/components/lang-icon"));

interface LanguageSelectorItemProps{
     lang: ILangItem
     onSelect: () => void
}
export default function LangSelectorItem({lang, onSelect}: LanguageSelectorItemProps){
     const {t} = useTranslation("languages")
     return (
          <CommandItem
               value={`${t(lang.code)} (${lang.code})`}
               onSelect={onSelect}
          >
               <Suspense fallback={<Skeleton className="size-4.5"/>}>
                    <LangIcon lang={lang}/>
               </Suspense>
               {t(lang.code)} ({lang.code})
          </CommandItem>
     )
}