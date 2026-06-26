import type { GlossaryEntry } from "@/lib/types/data"
import { cn } from "@/lib/utils"
import { CheckCircle, ArrowRight, Dot } from "lucide-react"
import { useTranslation } from "react-i18next"

interface GlossarySidebarItemProps {
     data: GlossaryEntry,
     found?: boolean,
     onSelect?: (item: GlossaryEntry) => void
}
export function GlossarySidebarItem({data, found=false, onSelect}: GlossarySidebarItemProps){
     const {t} = useTranslation("glossary")
     return (
          <li className="space-y-1 first:pt-2 pb-2 border-b last:pb-0 last:border-b-0 text-center hover:cursor-pointer" onClick={()=>onSelect?.(data)}>
               <div className="grid grid-cols-[1fr_16px_1fr] gap-2 place-items-center">
                    <p className="text-sm font-semibold inline-block">{data.term}</p>
                    {found ? (
                         <CheckCircle className="size-4 text-emerald-600 dark:text-emerald-400"/>
                    ) : (
                         <ArrowRight className="size-4 text-muted-foreground"/>
                    )}
                    <p className="text-sm inline-block">{data.translation}</p>
               </div>
               <div className={cn("grid grid-cols-[1fr_16px_1fr] gap-2 place-items-center", found ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground")}>
                    <p className="italic text-xs">{t(`parts-of-speech.${data.partOfSpeech}`)}</p>
                    <Dot className="size-4"/>
                    <p className="text-xs" title={t("domain")}>{data.domain}</p>
               </div>
          </li>
     )
}