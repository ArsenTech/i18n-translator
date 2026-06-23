import { Button } from "@/components/ui/button";
import FileActions from "@/actions/file";
import FindActions, { FindResult } from "@/actions/find";
import TranslatorActions from "@/actions/translator";
import { BookOpen, BookPlus, Delete, FilePlus, FolderOpen, FolderPen, Languages, RefreshCcw, RotateCcw, Save, Scan, Search, SearchCheck, SearchSlash, SpellCheckIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { PROVIDER_NAMES } from "@/lib/constants";
import { AutoTranslateProvider } from "@/schemas/types";
import { lazy, Suspense, useCallback, useState } from "react";
import { getErrorMessage } from "@/lib/utils";
import { toast } from "sonner";
import { useAppTranslation } from "@/context/translation";
import { Spinner } from "@/components/ui/spinner";
import { Skeleton } from "../ui/skeleton";
import { useSettings } from "@/context/settings";
import EditActions from "@/actions/edit";

const NewTranslationPopup = lazy(()=>import("@/popups/new-translation"));
const OpenTranslationPopup = lazy(()=>import("@/popups/open-translation"));
const OpenXliffPopup = lazy(()=>import("@/popups/open-xliff"));
const AutoTranslatePopup = lazy(()=>import("@/popups/auto-translate"));
const ReplaceTranslationPopup = lazy(()=>import("@/popups/replace-translation"));
const SpellCheckPopup = lazy(()=>import("@/popups/spell-check"));
const FindPopup = lazy(()=>import("@/popups/find"));
const BatchRenameKeysPopup = lazy(()=>import("@/popups/batch-rename-keys"));
const AddToGlossaryPopup = lazy(()=>import("@/popups/add-to-glossary"));
const TransliterateScriptPopup = lazy(()=>import("@/popups/transliterate-script"));
const GlossaryManagerPopup = lazy(()=>import("@/popups/glossary-manager"));

export default function QuickAccessToolbar(){
     const [isSaving, setIsSaving] = useState(false)
     const {table, files, baseKeys, setCurrentTranslation, setInput, setVisibleCount, visibleTable, setIsDirty, langs, reset, setSelectedKeys, setTable, findState, setFindState} = useAppTranslation()
     const {toolbars} = useSettings()
     const findAction = (type: "next" | "prev" | "missing") => {
          const res: FindResult = type==="next" ? FindActions.findNext(findState) : type==="prev" ? FindActions.findPrev(findState) : type==="missing" ? FindActions.findMissing(visibleTable) : {success: false, error: "Unknown find action"}
          if(res.success) {
               if(res.findState) setFindState(res.findState)
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
     const removeUnusedKeys = () => {
          const res = TranslatorActions.removeUnusedKeys(table,baseKeys)
          if(res.success) {
               toast.success(res.success)
               setTable(res.data)
               setIsDirty(true)
          }
     }
     return (
          <div className="px-4 pt-2 gap-1 flex items-center justify-center flex-wrap">
               {toolbars.newFile && (
                    <Suspense fallback={<Skeleton className="h-8 flex-1 aspect-square"/>}>
                         <NewTranslationPopup triggerButton={(
                              <Button variant="secondary" className="flex-1 aspect-square" title="New Translation">
                                   <FilePlus/>
                              </Button>
                         )}/>
                    </Suspense>
               )}
               {toolbars.openFile && (
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
               )}
               {toolbars.saveFile && (
                    <Button variant="secondary" className="flex-1 aspect-square" title="Save Translation" onClick={save} disabled={isSaving}>
                         {isSaving ? <Spinner/> : <Save/>}
                    </Button>
               )}
               {toolbars.find && (
                    <DropdownMenu modal={false}>
                         <DropdownMenuTrigger asChild>
                              <Button variant="secondary" className="flex-1 aspect-square" title="Find">
                                   <Search/>
                              </Button>
                         </DropdownMenuTrigger>
                         <DropdownMenuContent>
                              <Suspense fallback={<Skeleton className="h-5 w-full max-w-48 my-1.5"/>}>
                                   <FindPopup triggerButton={(
                                        <DropdownMenuItem onSelect={e=>e.preventDefault()}>Find...</DropdownMenuItem>
                                   )}/>
                              </Suspense>
                              <DropdownMenuItem onClick={()=>findAction("next")}>Find Next</DropdownMenuItem>
                              <DropdownMenuItem onClick={()=>findAction("prev")}>Find Previous</DropdownMenuItem>
                         </DropdownMenuContent>
                    </DropdownMenu>
               )}
               {toolbars.findMissing && (
                    <Button variant="secondary" className="flex-1 aspect-square" title="Find Missing Keys" onClick={()=>findAction("missing")}>
                         <SearchSlash/>
                    </Button>
               )}
               {toolbars.replace && (
                    <Suspense fallback={<Skeleton className="h-8 flex-1 aspect-square"/>}>
                         <ReplaceTranslationPopup triggerButton={(
                              <Button variant="secondary" className="flex-1 aspect-square" title="Replace Translation">
                                   <RotateCcw/>
                              </Button>
                         )}/>
                    </Suspense>
               )}
               {toolbars.batchRename && (
                    <Suspense fallback={<Skeleton className="h-8 flex-1 aspect-square"/>}>
                         <BatchRenameKeysPopup triggerButton={(
                              <Button variant="secondary" className="flex-1 aspect-square" title="Batch Rename Keys">
                                   <FolderPen/>
                              </Button>
                         )}/>
                    </Suspense>
               )}
               {toolbars.selectUntranslated && (
                    <Button variant="secondary" className="flex-1 aspect-square" title="Select Untranslated" onClick={()=>EditActions.selectUntranslated(table, setSelectedKeys)}>
                         <Scan/>
                    </Button>
               )}
               {toolbars.addToGlossary && (
                    <Suspense fallback={<Skeleton className="h-8 flex-1 aspect-square"/>}>
                         <AddToGlossaryPopup triggerButton={(
                              <Button variant="secondary" className="flex-1 aspect-square" title="Add To Glossary">
                                   <BookPlus/>
                              </Button>
                         )}/>
                    </Suspense>
               )}
               {toolbars.autoTranslate && (
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
               )}
               {toolbars.validateKeys && (
                    <Button variant="secondary" className="flex-1 aspect-square" title="Validate Keys" onClick={validateKeys}>
                         <SearchCheck/>
                    </Button>
               )}
               {toolbars.removeUnusedKeys && (
                    <Button variant="secondary" className="flex-1 aspect-square" title="Remove Unused Keys" onClick={removeUnusedKeys}>
                         <Delete/>
                    </Button>
               )}
               {toolbars.transliterate && (
                    <Suspense fallback={<Skeleton className="h-8 flex-1 aspect-square"/>}>
                         <TransliterateScriptPopup triggerButton={(
                              <Button variant="secondary" className="flex-1 aspect-square" title="Transliterate">
                                   <RefreshCcw/>
                              </Button>
                         )}/>
                    </Suspense>
               )}
               {toolbars.glossaryManager && (
                    <Suspense fallback={<Skeleton className="h-8 flex-1 aspect-square"/>}>
                         <GlossaryManagerPopup triggerButton={(
                              <Button variant="secondary" className="flex-1 aspect-square" title="Glossary Manager">
                                   <BookOpen/>
                              </Button>
                         )}/>
                    </Suspense>
               )}
               {toolbars.spellCheck && (
                    <Suspense fallback={<Skeleton className="h-8 flex-1 aspect-square"/>}>
                         <SpellCheckPopup triggerButton={(
                              <Button variant="secondary" className="flex-1 aspect-square" title="Spell Check">
                                   <SpellCheckIcon/>
                              </Button>
                         )}/>
                    </Suspense>
               )}
          </div>
     )
}