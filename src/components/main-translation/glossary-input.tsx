import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Copy, Save } from "lucide-react";
import { useMemo, useTransition } from "react";
import { useAppTranslation } from "@/context/translation";
import { useGlossary } from "@/context/glossary";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/utils";
import GlossaryActions from "@/lib/store/glossary";
import { Spinner } from "../ui/spinner";
import { Input } from "../ui/input";
import { ButtonGroup } from "../ui/button-group";

export default function GlossaryInput(){
     const {langs} = useAppTranslation()
     const {glossary, currEntry, setGlossary, setCurrentEntry, input, setInput} = useGlossary()
     const [isSaving, startTransition] = useTransition()
     const percentage = useMemo(()=>{
          const total = glossary.length;
          const translated = glossary.filter(val=>val.translation.trim()!=="").length
          return total > 0 ? Math.min(100,Math.floor((translated / total) * 100)) : 0
     },[glossary])
     const saveAndNext = () => {
          if(isSaving) return;
          startTransition(async() => {
               try {
                    await saveString()
                    GlossaryActions.jumpToNextBlankField({
                         glossary, currEntry, setInput,
                         onSelectEntry: setCurrentEntry
                    })
               } catch (err) {
                    toast.error("Failed to save the glossary entry",{
                         description: getErrorMessage(err)
                    })
               }
          })
     }
     const saveAndPrev = () => {
          if(isSaving) return;
          startTransition(async() => {
               try {
                    await saveString()
                    GlossaryActions.jumpToPrevBlankField({
                         glossary, currEntry, setInput,
                         onSelectEntry: setCurrentEntry
                    })
               } catch (err) {
                    toast.error("Failed to save the glossary entry",{
                         description: getErrorMessage(err)
                    })
               }
          })
     }
     const saveString = async() => {
          try {
               if (!langs.base.trim() || !langs.target.trim()) {
                    throw new Error("Base and target languages are required");
               }
               const newItem = [...glossary].map(item => item.term === currEntry?.term ? {
                    ...item,
                    translation: input
               }
               : item)
               setGlossary(newItem)
               await GlossaryActions.setGlossary(langs,newItem)
          } catch (err) {
               toast.error("Failed to save the glossary entry",{
                    description: getErrorMessage(err)
               })
          }
     }
     const saveEntry = () => {
          if(isSaving) return;
          startTransition(saveString)
     }
     return (
          <>
          <div className="flex items-center gap-2">
               <div className="text-sm">{percentage}%</div>
               <Progress className="h-3 flex-1" value={percentage}/>
          </div>
          <div className="flex gap-2">
               <ButtonGroup className="flex-1">
                    <Input
                         value={input}
                         onChange={e=>setInput(e.target.value)}
                         className="flex-2"
                         placeholder="Insert the translation here"
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
                    <Button disabled={isSaving} variant="secondary" onClick={()=>GlossaryActions.borrowFromSource(currEntry,setInput)} size="icon" title="Copy from Source">
                         <Copy/>
                    </Button>
                    <Button disabled={isSaving} onClick={saveEntry} size="icon" title="Save String">
                         {isSaving ? <Spinner/> : <Save/>}
                    </Button>
               </ButtonGroup>
               <div className="flex items-center gap-1 justify-center flex-wrap">
                    <Button disabled={isSaving} className="flex-1" onClick={saveAndPrev} size="icon" title="Previous">
                         <ChevronLeft/>
                    </Button>
                    <Button disabled={isSaving} className="flex-1" onClick={saveAndNext} size="icon" title="Next">
                         <ChevronRight/>
                    </Button>
               </div>
          </div>
          </>
     )
}