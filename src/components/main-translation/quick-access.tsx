import { Button } from "@/components/ui/button";
import FileActions from "@/actions/file";
import FindActions from "@/actions/find";
import TranslatorActions from "@/actions/translator";
import { FilePlus, FolderOpen, Languages, RotateCcw, Save, Search, SearchCheck, SpellCheckIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import NewTranslationPopup from "@/popups/modals/new-translation";
import OpenTranslationPopup from "@/popups/modals/open-translation";
import { PROVIDER_NAMES } from "@/lib/constants";
import AutoTranslatePopup from "@/popups/modals/auto-translate";
import { AutoTranslateProvider } from "@/schemas/types";
import ReplaceTranslationPopup from "@/popups/modals/replace-translation";
import SpellCheckPopup from "@/popups/modals/spell-check";
import { useCallback, useState } from "react";
import { getErrorMessage } from "@/lib/utils";
import { toast } from "sonner";
import { useAppTranslation } from "@/context/translation";
import { Spinner } from "../ui/spinner";

export default function QuickAccessToolbar(){
     const [isSaving, setIsSaving] = useState(false)
     const {table, files, baseKeys, setCurrentTranslation, setInput, setVisibleCount, visibleTable} = useAppTranslation()
     const findMissing = () => {
          const res = FindActions.findMissing(visibleTable)
          if(res.success) {
               TranslatorActions.jumpToTranslation({
                    translation: res.translation,
                    index: res.index,
                    setCurrentTranslation,
                    setInput,
                    setVisibleCount,
               })
          } else {
               toast.error("Failed to find the query inside the translation",{
                    description: res.error
               })
          }
     }
     const save = useCallback(async() => {
          if(isSaving) return;
          setIsSaving(true)
          try {
               const res = await FileActions.saveAll(table, files.targetPath)
               if(res?.error) toast.error("Failed to save the file",{
                    description: res.error
               })
               if(res?.success) toast.success(res.success)
          } catch (err){
               toast.error("Failed to save the file",{
                    description: getErrorMessage(err)
               })
          } finally {
               setIsSaving(false)
          }
     }, [isSaving, table, files.targetPath])
     const validateKeys = () => {
          const res = TranslatorActions.validateKeys(table, baseKeys)
          if (res.success) {
               toast.success("All keys are valid")
          } else {
               toast.error(`${res.count} invalid keys found`)
          }
     }
     return (
          <div className="px-4 pt-2 gap-1 flex items-center justify-center flex-wrap">
               <NewTranslationPopup triggerButton={(
                    <Button variant="secondary" className="flex-1 aspect-square" title="New Translation">
                         <FilePlus/>
                    </Button>
               )}/>
               <OpenTranslationPopup triggerButton={(
                    <Button variant="secondary" className="flex-1 aspect-square" title="Open Translation">
                         <FolderOpen/>
                    </Button>
               )}/>
               <Button variant="secondary" className="flex-1 aspect-square" title="Save Translation" onClick={save} disabled={isSaving}>
                    {isSaving ? <Spinner/> : <Save/>}
               </Button>
               <Button variant="secondary" className="flex-1 aspect-square" title="Find Missing Keys" onClick={findMissing}>
                    <Search/>
               </Button>
               <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                         <Button variant="secondary" className="flex-1 aspect-square" title="Auto-translate">
                              <Languages/>
                         </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full min-w-48">
                         <DropdownMenuLabel>Translate Using...</DropdownMenuLabel>
                         <DropdownMenuSeparator/>
                         {Object.entries(PROVIDER_NAMES).map(([provider,name])=>(
                              <AutoTranslatePopup
                                   key={provider}
                                   provider={provider as AutoTranslateProvider}
                                   triggerButton={<DropdownMenuItem onSelect={e=>e.preventDefault()}>{name}</DropdownMenuItem>}
                              />
                         ))}
                    </DropdownMenuContent>
               </DropdownMenu>
               <Button variant="secondary" className="flex-1 aspect-square" title="Validate Keys" onClick={validateKeys}>
                    <SearchCheck/>
               </Button>
               <ReplaceTranslationPopup triggerButton={(
                    <Button variant="secondary" className="flex-1 aspect-square" title="Replace Translation">
                         <RotateCcw/>
                    </Button>
               )}/>
               <SpellCheckPopup triggerButton={(
                    <Button variant="secondary" className="flex-1 aspect-square" title="Spell Check">
                         <SpellCheckIcon/>
                    </Button>
               )}/>
          </div>
     )
}