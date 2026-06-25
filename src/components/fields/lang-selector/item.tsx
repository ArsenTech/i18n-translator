import { CommandItem } from "@/components/ui/command"
import { Skeleton } from "@/components/ui/skeleton";
import type { ILangItem } from "@/lib/types/data"
import { lazy, Suspense } from "react";

const LangIcon = lazy(()=>import("@/components/lang-icon"));

interface LanguageSelectorItemProps{
     lang: ILangItem
     onSelect: () => void
}
export default function LangSelectorItem({lang, onSelect}: LanguageSelectorItemProps){
     return (
          <CommandItem
               value={`${lang.name} (${lang.code})`}
               onSelect={onSelect}
          >
               <Suspense fallback={<Skeleton className="size-4.5"/>}>
                    <LangIcon lang={lang}/>
               </Suspense>
               {lang.name} ({lang.code})
          </CommandItem>
     )
}