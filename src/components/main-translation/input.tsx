import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, ChevronRight, Copy, Save } from "lucide-react";
import { useMemo, useTransition } from "react";
import TranslatorActions from "@/actions/translator";
import { useAppTranslation } from "@/context/translation";
import { useSettings } from "@/context/settings";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/utils";
import FileActions from "@/actions/file";
import LoadingButton from "../loading-button";
import { useEditor } from "@/context/editor";
import { useTranslation } from "react-i18next";

export default function TranslationInput(){
     const {t} = useTranslation("translation",{
          keyPrefix: "translation-input"
     })
     const [isSaving, startTransition] = useTransition()
     const {t: validationTxt} = useTranslation("validation")
     const {table, setTable, visibleTable, setIsDirty, files, langs} = useAppTranslation()
     const {currTranslation, setCurrentTranslation, input, setInput, inputRef} = useEditor()
     const {settings} = useSettings()
     const saveTranslation = () => {
          if(isSaving) return;
          if(settings.autoSave) {
               startTransition(async() => {
                    try {
                         const newTable = table.map(item => item.keyName === currTranslation?.keyName ? {
                              ...item,
                              translationString: !files.format ? input : files.format==="json" ? input : String.raw`${input}`
                         }
                         : item)
                         const res = await FileActions.saveAll({
                              table: newTable, targetPath: files.targetPath,
                              langs, preserveTranslations: settings.preserveEmpty,
                              preserveMetadata: settings.xliffPreserveMeta
                         }, validationTxt)
                         if(res.error) {
                              toast.error(t("auto-save-error"),{
                                   description: res.error,
                                   id: "auto-save-error"
                              });
                              return;
                         }
                         setTable(newTable)
                         setIsDirty(false)
                    } catch (err) {
                         toast.error(t("auto-save-error"),{
                              description: getErrorMessage(err),
                              id: "auto-save-error"
                         })
                    }
               })
          } else {
               TranslatorActions.saveString({input, setTable, currTranslation, format: files.format});
               setIsDirty(true)
               return;
          }
     }
     const percentage = useMemo(()=>{
          const data = settings.currNamespaceOnly ? visibleTable : table
          const total = data.length;
          const translated = data.filter(val=>val.translationString.trim()!=="").length
          return total > 0 ? Math.min(100,Math.floor((translated / total) * 100)) : 0
     },[table, visibleTable, settings.currNamespaceOnly])
     const saveAndNext = () => {
          saveTranslation()
          TranslatorActions.jumpToNextBlankField({
               table: visibleTable, currTranslation,
               setInput, onSelectTranslation: setCurrentTranslation
          })
     }
     const saveAndPrev = () => {
          saveTranslation()
          TranslatorActions.jumpToPrevBlankField({
               table: visibleTable, currTranslation,
               setInput, onSelectTranslation: setCurrentTranslation
          })
     }
     return (
          <>
          <div className="flex items-center gap-2">
               <div className="text-sm">{percentage}%</div>
               <Progress className="h-3 flex-1" value={percentage}/>
          </div>
          <div className="flex gap-2">
               <Textarea
                    ref={inputRef}
                    value={input}
                    onChange={e=>{
                         setInput(e.target.value)
                         setIsDirty(true)
                    }}
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
                         {t("copy-from-source")}
                    </Button>
                    <LoadingButton isLoading={isSaving} loaderText={t("save-string.loading")} className="w-full col-span-2" onClick={saveTranslation}>
                         <Save/>
                         {t("save-string.current")}
                    </LoadingButton>
                    <Button className="w-full col-span-2 sm:col-span-1" onClick={()=>TranslatorActions.jumpToPrevBlankField({
                         table: visibleTable, currTranslation,
                         setInput, onSelectTranslation: setCurrentTranslation
                    })}>
                         <ChevronLeft/>
                         {t("prev")}
                    </Button>
                    <Button className="w-full col-span-2 sm:col-span-1" onClick={()=>TranslatorActions.jumpToNextBlankField({
                         table: visibleTable, currTranslation,
                         setInput, onSelectTranslation: setCurrentTranslation
                    })}>
                         
                         {t("next")}
                         <ChevronRight/>
                    </Button>
               </div>
          </div>
          </>
     )
}