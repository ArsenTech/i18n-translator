import { Button } from "@/components/ui/button";
import FileActions from "@/actions/file";
import FindActions from "@/actions/find";
import TranslatorActions from "@/actions/translator";
import { FilePlus, FolderOpen, Languages, RotateCcw, Save, Search, SearchCheck, SpellCheckIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { PROVIDER_NAMES } from "@/lib/constants";
import { AutoTranslateProvider } from "@/schemas/types";
import { lazy, Suspense, useCallback, useState } from "react";
import { getErrorMessage } from "@/lib/utils";
import { toast } from "sonner";
import { useAppTranslation } from "@/context/translation";
import { Spinner } from "@/components/ui/spinner";
import { Skeleton } from "../ui/skeleton";

const NewTranslationPopup = lazy(()=>import("@/popups/new-translation"));
const OpenTranslationPopup = lazy(()=>import("@/popups/open-translation"));
const OpenXliffPopup = lazy(()=>import("@/popups/open-xliff"));
const AutoTranslatePopup = lazy(()=>import("@/popups/auto-translate"));
const ReplaceTranslationPopup = lazy(()=>import("@/popups/replace-translation"));
const SpellCheckPopup = lazy(()=>import("@/popups/spell-check"));

export default function QuickAccessToolbar(){
     const [isSaving, setIsSaving] = useState(false)
     const {table, files, baseKeys, setCurrentTranslation, setInput, setVisibleCount, visibleTable, setIsDirty, langs, reset} = useAppTranslation()
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
               const res = await FileActions.saveAll(table, files.targetPath, langs)
               if(res?.error) toast.error("Failed to save the file",{
                    description: res.error
               })
               if(res?.success) {
                    toast.success(res.success)
                    setIsDirty(false)
               }
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
               <Suspense fallback={<Skeleton className="h-8 flex-1 aspect-square"/>}>
                    <NewTranslationPopup triggerButton={(
                         <Button variant="secondary" className="flex-1 aspect-square" title="New Translation">
                              <FilePlus/>
                         </Button>
                    )}/>
               </Suspense>
               <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                         <Button variant="secondary" className="flex-1 aspect-square" title="Open Translation">
                         <FolderOpen/>
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full min-w-48">
                         <Suspense fallback={(
                              <>
                              <Skeleton className="h-5 w-full max-w-48 my-1.5"/>
                              <Skeleton className="h-5 w-full max-w-48 my-1.5"/>
                              </>
                         )}>
                              <OpenTranslationPopup triggerButton={(
                                   <DropdownMenuItem onSelect={e=>e.preventDefault()} disabled={!!files.format}>Open Translation</DropdownMenuItem>
                              )}/>
                              <OpenXliffPopup triggerButton={(
                                   <DropdownMenuItem onSelect={e=>e.preventDefault()} disabled={!!files.format}>Open XLIFF File</DropdownMenuItem>
                              )}/>
                         </Suspense>
                         <DropdownMenuSeparator/>
                         <DropdownMenuItem onClick={reset} disabled={!files.format}>Close Current Translation</DropdownMenuItem>
                    </DropdownMenuContent>
               </DropdownMenu>
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
                         <Suspense fallback={(
                              <>
                              {Array.from({length: 4}).map((_,i)=>(
                                   <Skeleton key={i+1} className="h-5 w-full max-w-48 my-1.5"/>
                              ))}
                              </>
                         )}>
                              {Object.entries(PROVIDER_NAMES).map(([provider,name])=>(
                                   <AutoTranslatePopup
                                        key={provider}
                                        provider={provider as AutoTranslateProvider}
                                        triggerButton={<DropdownMenuItem onSelect={e=>e.preventDefault()}>{name}</DropdownMenuItem>}
                                   />
                              ))}
                         </Suspense>
                    </DropdownMenuContent>
               </DropdownMenu>
               <Button variant="secondary" className="flex-1 aspect-square" title="Validate Keys" onClick={validateKeys}>
                    <SearchCheck/>
               </Button>
               <Suspense fallback={<Skeleton className="h-8 flex-1 aspect-square"/>}>
                    <ReplaceTranslationPopup triggerButton={(
                         <Button variant="secondary" className="flex-1 aspect-square" title="Replace Translation">
                              <RotateCcw/>
                         </Button>
                    )}/>
               </Suspense>
               <Suspense fallback={<Skeleton className="h-8 flex-1 aspect-square"/>}>
                    <SpellCheckPopup triggerButton={(
                         <Button variant="secondary" className="flex-1 aspect-square" title="Spell Check">
                              <SpellCheckIcon/>
                         </Button>
                    )}/>
               </Suspense>
          </div>
     )
}