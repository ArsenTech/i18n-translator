import { useAppTranslation } from "@/context/translation";
import { lazy, Suspense } from "react";
import { Skeleton } from "../ui/skeleton";

const LangSelector = lazy(()=>import("@/components/fields/lang-selector"))

export default function LanguageSelect(){
     const {langs, updateLangs} = useAppTranslation()
     return (
          <div className="flex items-center gap-2">
               <span>From</span>
               <Suspense fallback={<Skeleton className="h-8 flex-1"/>}>
                    <LangSelector
                         placeholder="Base Language"
                         className="flex-1"
                         value={langs.base}
                         onChange={lang=>updateLangs({base: lang})}
                    />
               </Suspense>
               <span>to</span>
               <Suspense fallback={<Skeleton className="h-8 flex-1"/>}>
                    <LangSelector
                         className="flex-1"
                         value={langs.target}
                         onChange={lang=>updateLangs({target: lang})}
                    />
               </Suspense>
          </div>
     )
}