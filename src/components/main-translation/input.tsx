import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { ChevronRight, Copy, Save } from "lucide-react";
import { useMemo } from "react";
import TranslatorActions from "@/actions/translator";
import { useAppTranslation } from "@/context/translation";

interface TranslationInputProps{
     input: string,
     onInputChange: (input: string) => void
}
export default function TranslationInput({input, onInputChange}: TranslationInputProps){
     const {table, currTranslation, setTable} = useAppTranslation()
     const percentage = useMemo(()=>{
          const total = table.length;
          const translated = table.filter(val=>val.translationString.trim()!=="").length
          return total > 0 ? Math.min(100,Math.floor((translated / total) * 100)) : 0
     },[table])
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
                    <Button className="flex-1" variant="secondary" onClick={()=>TranslatorActions.borrowFromSource(currTranslation,onInputChange)}>
                         <Copy/>
                         Copy from Source
                    </Button>
                    <Button className="flex-1" onClick={()=>TranslatorActions.saveString({input, setTable, currTranslation})}>
                         <Save/>
                         Save String
                    </Button>
                    <Button className="flex-1" onClick={TranslatorActions.jumpToNextBlankField}>
                         Next Blank Field
                         <ChevronRight/>
                    </Button>
               </div>
          </div>
          </>
     )
}