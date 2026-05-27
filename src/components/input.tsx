import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { mockupData } from "@/lib/constants"
import { ITranslation } from "@/lib/types";
import { ChevronRight, Copy, Save } from "lucide-react";
import { useMemo } from "react";

interface TranslationInputProps{
     currTranslation?: ITranslation | null,
     input: string,
     onInputChange: (input: string) => void
}
export default function TranslationInput({currTranslation, input, onInputChange}: TranslationInputProps){
     const total = useMemo(()=>mockupData.length,[mockupData])
     const translatedCount = useMemo(()=>mockupData.filter(val=>val.translationString.trim()!=="").length,[mockupData])
     const percentage = useMemo(()=>{
          return total > 0 ? Math.min(100,Math.floor((translatedCount / total) * 100)) : 0
     },[translatedCount, total])
     return (
          <>
          <div className="flex items-center gap-2">
               <div className="text-sm">{percentage}%</div>
               <Progress className="h-3 flex-1" value={percentage}/>
          </div>
          <div className="flex gap-2">
               <Textarea
                    value={input}
                    onChange={e=>onInputChange(e.target.value)}
                    className="flex-2"
                    rows={3}
               />
               <div className="flex items-center gap-1 flex-wrap flex-1">
                    <Button className="flex-1" variant="secondary" onClick={()=>{
                         if(!currTranslation) return;
                         onInputChange(currTranslation.baseString)
                    }}>
                         <Copy/>
                         Copy from Source
                    </Button>
                    <Button className="flex-1">
                         <Save/>
                         Save String
                    </Button>
                    <Button className="flex-1">
                         Next Blank Field
                         <ChevronRight/>
                    </Button>
               </div>
          </div>
          </>
     )
}