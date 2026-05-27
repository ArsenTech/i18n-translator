import { mockupData } from "@/lib/constants"
import { ITranslation } from "@/lib/types";
import { useMemo } from "react";

interface TranslatorStatsProps{
     currTranslation?: ITranslation | null
}
export default function TranslatorStats({currTranslation}: TranslatorStatsProps){
     const translatedCount = useMemo(()=>mockupData.filter(val=>val.translationString.trim()!=="").length,[mockupData])
     const sourceAsTranslationCount = useMemo(()=>mockupData.filter(val=>val.baseString===val.translationString).length,[mockupData])
     return (
          <div className="flex justify-between items-center text-xs md:text-sm flex-wrap gap-2">
               <div className="flex items-center gap-2">
                    <div className="flex gap-2 justify-center items-center bg-card border rounded-md px-3 py-1">
                         <span className="text-base md:text-lg">{mockupData.length-translatedCount}</span>
                         <span className="text-muted-foreground">Untranslated</span>
                    </div>
                    <div className="flex gap-2 justify-center items-center bg-card border rounded-md px-3 py-1">
                         <span className="text-base md:text-lg">{translatedCount}</span>
                         <span className="text-muted-foreground">Translated</span>
                    </div>
                    {sourceAsTranslationCount>0 && (
                         <div className="flex gap-2 justify-center items-center bg-card border rounded-md px-3 py-1">
                              <span className="text-base md:text-lg">{sourceAsTranslationCount}</span>
                              <span className="text-muted-foreground">Borrowed from Source</span>
                         </div>
                    )}
                    <div className="flex gap-2 justify-center items-center bg-card border rounded-md px-3 py-1">
                         <span className="text-base md:text-lg">{mockupData.length}</span>
                         <span className="text-muted-foreground">Total</span>
                    </div>
               </div>
               {currTranslation && (
                    <div className="flex items-center gap-2">
                         <p className="text-muted-foreground">{currTranslation.keyName}</p>
                         <div className="flex gap-2 justify-center items-center bg-card border rounded-md px-3 py-1">
                              <span className="text-muted-foreground">Line &#x2116;</span>
                              <span className="text-base md:text-lg">{currTranslation.lineNumber}</span>
                         </div>
                    </div>
               )}
          </div>
     )
}