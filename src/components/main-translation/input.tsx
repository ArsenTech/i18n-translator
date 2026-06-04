import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, ChevronRight, Copy, Save } from "lucide-react";
import { useMemo, useState } from "react";
import TranslatorActions from "@/actions/translator";
import { useAppTranslation } from "@/context/translation";
import { ITranslation } from "@/lib/types/data";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

interface TranslationInputProps{
     input: string,
     onInputChange: (input: string) => void
     visibleTable: ITranslation[]
}
export default function TranslationInput({input, onInputChange, visibleTable}: TranslationInputProps){
     const {table, currTranslation, setTable, setCurrentTranslation} = useAppTranslation()
     const [checked, setChecked] = useState(false)
     const percentage = useMemo(()=>{
          const data = checked ? visibleTable : table
          const total = data.length;
          const translated = data.filter(val=>val.translationString.trim()!=="").length
          return total > 0 ? Math.min(100,Math.floor((translated / total) * 100)) : 0
     },[table, visibleTable, checked])
     const saveAndNext = () => {
          TranslatorActions.saveString({input, setTable, currTranslation})
          TranslatorActions.jumpToNextBlankField({
               table: visibleTable, currTranslation,
               setInput: onInputChange,
               onSelectTranslation: setCurrentTranslation
          })
     }
     const saveAndPrev = () => {
          TranslatorActions.saveString({input, setTable, currTranslation})
          TranslatorActions.jumpToPrevBlankField({
               table: visibleTable, currTranslation,
               setInput: onInputChange,
               onSelectTranslation: setCurrentTranslation
          })
     }
     return (
          <>
          <div className="flex items-center gap-2">
               <div className="text-sm">{percentage}%</div>
               <Progress className="h-3 flex-1" value={percentage}/>
          </div>
          {/* TODO: Move this into Settings if settings is created */}
          <div className="flex items-center justify-between gap-2">
               <Label htmlFor="switch-mode">Show current namespace only</Label>
               <Switch id="switch-mode" checked={checked} onCheckedChange={setChecked}/>
          </div>
          <div className="flex gap-2">
               <Textarea
                    value={input}
                    onChange={e=>onInputChange(e.target.value)}
                    className="flex-2"
                    rows={3}
                    onKeyDown={e => {
                         if(e.shiftKey && e.key==="Tab") {
                              e.preventDefault()
                              saveAndPrev()
                         } else if (e.key === "Tab") {
                              e.preventDefault()
                              saveAndNext()
                         }
                    }}
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
                    <Button className="flex-1" onClick={()=>TranslatorActions.jumpToPrevBlankField({
                         table: visibleTable, currTranslation,
                         setInput: onInputChange,
                         onSelectTranslation: setCurrentTranslation
                    })}>
                         <ChevronLeft/>
                         Previous Blank Field
                    </Button>
                    <Button className="flex-1" onClick={()=>TranslatorActions.jumpToNextBlankField({
                         table: visibleTable, currTranslation,
                         setInput: onInputChange,
                         onSelectTranslation: setCurrentTranslation
                    })}>
                         Next Blank Field
                         <ChevronRight/>
                    </Button>
               </div>
          </div>
          </>
     )
}