import { useAppTranslation } from "@/context/translation";
import type { ITranslation } from "@/lib/types/data"
import { useMemo } from "react";

interface TranslatorStatsProps{
     currTranslation?: ITranslation | null,
}
export default function TranslatorStats({currTranslation}: TranslatorStatsProps){
     const {table} = useAppTranslation()
     const stats = useMemo(() => {
          let translated = 0
          let borrowed = 0

          for (const item of table) {
               if (item.translationString.trim() !== "") translated++
               if (item.baseString === item.translationString) borrowed++
          }

          return { translated, borrowed }
     }, [table])
     return (
          <div className="flex justify-between items-center text-xs md:text-sm flex-wrap gap-2">
               <div className="flex items-center gap-2">
                    <div className="flex gap-2 justify-center items-center bg-card border rounded-md px-3 py-1">
                         <span className="text-base md:text-lg">{table.length-stats.translated}</span>
                         <span className="text-muted-foreground">Untranslated</span>
                    </div>
                    <div className="flex gap-2 justify-center items-center bg-card border rounded-md px-3 py-1">
                         <span className="text-base md:text-lg">{stats.translated}</span>
                         <span className="text-muted-foreground">Translated</span>
                    </div>
                    {stats.borrowed>0 && (
                         <div className="flex gap-2 justify-center items-center bg-card border rounded-md px-3 py-1">
                              <span className="text-base md:text-lg">{stats.borrowed}</span>
                              <span className="text-muted-foreground">Borrowed from Source</span>
                         </div>
                    )}
                    <div className="flex gap-2 justify-center items-center bg-card border rounded-md px-3 py-1">
                         <span className="text-base md:text-lg">{table.length}</span>
                         <span className="text-muted-foreground">Total</span>
                    </div>
               </div>
               {currTranslation && (
                    <div className="flex items-center gap-2">
                         <p className="text-muted-foreground font-mono font-semibold">{currTranslation.keyName}</p>
                         <div className="flex gap-2 justify-center items-center bg-card border rounded-md px-3 py-1">
                              <span className="text-muted-foreground">Line &#x2116;</span>
                              <span className="text-base md:text-lg">{currTranslation.lineNumber}</span>
                         </div>
                    </div>
               )}
          </div>
     )
}