import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, ChevronRight, Copy, Save } from "lucide-react";
import { useMemo, useState } from "react";
import TranslatorActions from "@/actions/translator";
import { useAppTranslation } from "@/context/translation";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function TranslationInput(){
     const {table, currTranslation, setTable, setCurrentTranslation, input, setInput, visibleTable, setIsDirty, inputRef, files} = useAppTranslation()
     const [checked, setChecked] = useState(false)
     const percentage = useMemo(()=>{
          const data = checked ? visibleTable : table
          const total = data.length;
          const translated = data.filter(val=>val.translationString.trim()!=="").length
          return total > 0 ? Math.min(100,Math.floor((translated / total) * 100)) : 0
     },[table, visibleTable, checked])
     const saveAndNext = () => {
          TranslatorActions.saveString({input, setTable, currTranslation, format: files.format})
          TranslatorActions.jumpToNextBlankField({
               table: visibleTable, currTranslation,
               setInput, onSelectTranslation: setCurrentTranslation
          })
          setIsDirty(true)
     }
     const saveAndPrev = () => {
          TranslatorActions.saveString({input, setTable, currTranslation, format: files.format})
          TranslatorActions.jumpToPrevBlankField({
               table: visibleTable, currTranslation,
               setInput, onSelectTranslation: setCurrentTranslation
          })
          setIsDirty(true)
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
                    ref={inputRef}
                    value={input}
                    onChange={e=>setInput(e.target.value)}
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
               <div className="grid grid-cols-2 gap-1">
                    <Button className="w-full col-span-2" variant="secondary" onClick={()=>{
                         TranslatorActions.borrowFromSource(currTranslation,setInput)
                         setIsDirty(true)
                    }}>
                         <Copy/>
                         Copy from Source
                    </Button>
                    <Button className="w-full col-span-2" onClick={()=>{
                         TranslatorActions.saveString({input, setTable, currTranslation, format: files.format})
                         setIsDirty(true)
                    }}>
                         <Save/>
                         Save String
                    </Button>
                    <Button className="w-full col-span-2 sm:col-span-1" onClick={()=>TranslatorActions.jumpToPrevBlankField({
                         table: visibleTable, currTranslation,
                         setInput, onSelectTranslation: setCurrentTranslation
                    })}>
                         <ChevronLeft/>
                         Previous
                    </Button>
                    <Button className="w-full col-span-2 sm:col-span-1" onClick={()=>TranslatorActions.jumpToNextBlankField({
                         table: visibleTable, currTranslation,
                         setInput, onSelectTranslation: setCurrentTranslation
                    })}>
                         Next
                         <ChevronRight/>
                    </Button>
               </div>
          </div>
          </>
     )
}