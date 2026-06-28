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
import { useTranslation } from "react-i18next";

export default function GlossaryInput(){
     const {t} = useTranslation("glossary",{
          keyPrefix: "manager"
     })
     const {t: validationTxt} = useTranslation("validation")
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
                    toast.error(t("save-error"),{
                         description: getErrorMessage(err),
                         id: "glossary-save-error"
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
                    toast.error(t("save-error"),{
                         description: getErrorMessage(err),
                         id: "glossary-save-error"
                    })
               }
          })
     }
     const saveString = async() => {
          try {
               if (!langs.base.trim() || !langs.target.trim()) {
                    throw new Error(t("no-base-target"));
               }
               const newItem = [...glossary].map(item => item.term === currEntry?.term ? {
                    ...item,
                    translation: input
               }
               : item)
               setGlossary(newItem)
               await GlossaryActions.setGlossary(langs,newItem,validationTxt)
          } catch (err) {
               toast.error(t("save-error"),{
                    description: getErrorMessage(err),
                    id: "glossary-save-error"
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
                         placeholder={t("placeholder")}
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
                    <Button disabled={isSaving} variant="secondary" onClick={()=>GlossaryActions.borrowFromSource(currEntry,setInput)} size="icon" title={t("copy-from-source")}>
                         <Copy/>
                    </Button>
                    <Button disabled={isSaving} onClick={saveEntry} size="icon" title={t("save-string")}>
                         {isSaving ? <Spinner/> : <Save/>}
                    </Button>
               </ButtonGroup>
               <div className="flex items-center gap-1 justify-center flex-wrap">
                    <Button disabled={isSaving} className="flex-1" onClick={saveAndPrev} size="icon" title={t("previous")}>
                         <ChevronLeft/>
                    </Button>
                    <Button disabled={isSaving} className="flex-1" onClick={saveAndNext} size="icon" title={t("next")}>
                         <ChevronRight/>
                    </Button>
               </div>
          </div>
          </>
     )
}