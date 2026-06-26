import { Button } from "@/components/ui/button";
import FileActions from "@/actions/file";
import FindActions from "@/actions/find";
import TranslatorActions from "@/actions/translator";
import { BookOpen, BookPlus, Delete, FilePlus, FolderOpen, FolderPen, Languages, RefreshCcw, RotateCcw, Save, Scan, Search, SearchCheck, SearchSlash, SpellCheckIcon, Zap } from "lucide-react";
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
import { Separator } from "../ui/separator";
import { useEditor } from "@/context/editor";
import type { FindResult } from "@/lib/types/find";
import { useTranslation } from "react-i18next";

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
     const {t} = useTranslation("quick-access")
     const [isSaving, setIsSaving] = useState(false)
     const {table, files, baseKeys, visibleTable, setIsDirty, langs, reset, setTable} = useAppTranslation()
     const {setCurrentTranslation,setInput, setVisibleCount, setSelectedKeys, findState, setFindState} = useEditor()
     const {toolbars, settings} = useSettings()
     const findAction = (type: "next" | "prev" | "missing") => {
          const res: FindResult =
               type==="next" ? FindActions.findNext(findState) :
               type==="prev" ? FindActions.findPrev(findState) :
               type==="missing" ? FindActions.findMissing(visibleTable) :
               {success: false, error: t("find.unknown")}
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
               toast.error(t("find.query-error"),{
                    description: res.error
               })
          }
     }
     const save = useCallback(async() => {
          if(isSaving) return;
          setIsSaving(true)
          try {
               const res = await FileActions.saveAll(table, files.targetPath, langs, settings.preserveEmpty, settings.xliffPreserveMeta)
               if(res?.error) toast.error(t("save.error"),{
                    description: res.error,
                    id: "save-error"
               })
               if(res?.success) {
                    toast.success(res.success)
                    setIsDirty(false)
               }
          } catch (err){
               toast.error(t("save.error"),{
                    description: getErrorMessage(err),
                    id: "save-error"
               })
          } finally {
               setIsSaving(false)
          }
     }, [isSaving, table, files.targetPath])
     const validateKeys = () => {
          const res = TranslatorActions.validateKeys(table, baseKeys)
          if (res.success) {
               toast.success(t("validate-keys.valid"))
          } else {
               toast.error(t("validate-keys.invalid",{count: res.count}))
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
     const toolbarClass = settings.compactToolbar
          ? "px-4 pt-2 gap-2 flex items-center flex-wrap"
          : "px-4 pt-2 gap-1 flex items-center justify-center flex-wrap"

     const buttonClass = settings.compactToolbar
          ? "size-8 shrink-0"
          : "flex-1 aspect-square"
     const loaderClass =  settings.compactToolbar
          ? "size-8"
          : "h-8 flex-1 aspect-square"
     return (
          <div className={toolbarClass}>
               {settings.compactToolbar && (
                    <div className="flex items-center gap-2">
                         <Zap className="text-muted-foreground size-4"/>
                         <p className="font-semibold">{t("title")}</p>
                         <Separator orientation="vertical"/>
                    </div>
               )}
               {toolbars.newFile && (
                    <Suspense fallback={<Skeleton className={loaderClass}/>}>
                         <NewTranslationPopup triggerButton={(
                              <Button variant="secondary" size={settings.compactToolbar ? "icon" : "default"} className={buttonClass} title={t("new-translation")}>
                                   <FilePlus/>
                              </Button>
                         )}/>
                    </Suspense>
               )}
               {toolbars.openFile && (
                    <DropdownMenu modal={false}>
                         <DropdownMenuTrigger asChild>
                              <Button variant="secondary" size={settings.compactToolbar ? "icon" : "default"} className={buttonClass} title={t("open.translation")}>
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
                                        <DropdownMenuItem onSelect={e=>e.preventDefault()} disabled={!!files.format}>
                                             {t("open.translation")}
                                        </DropdownMenuItem>
                                   )}/>
                                   <OpenXliffPopup triggerButton={(
                                        <DropdownMenuItem onSelect={e=>e.preventDefault()} disabled={!!files.format}>
                                             {t("open.xliff")}
                                        </DropdownMenuItem>
                                   )}/>
                              </Suspense>
                              <DropdownMenuSeparator/>
                              <DropdownMenuItem onClick={reset} disabled={!files.format}>
                                   {t("close-current")}
                              </DropdownMenuItem>
                         </DropdownMenuContent>
                    </DropdownMenu>
               )}
               {toolbars.saveFile && (
                    <Button variant="secondary" size={settings.compactToolbar ? "icon" : "default"} className={buttonClass} title={t("save.title")} onClick={save} disabled={isSaving}>
                         {isSaving ? <Spinner/> : <Save/>}
                    </Button>
               )}
               {toolbars.find && (
                    <DropdownMenu modal={false}>
                         <DropdownMenuTrigger asChild>
                              <Button variant="secondary" size={settings.compactToolbar ? "icon" : "default"} className={buttonClass} title={t("find.title")}>
                                   <Search/>
                              </Button>
                         </DropdownMenuTrigger>
                         <DropdownMenuContent>
                              <Suspense fallback={<Skeleton className="h-5 w-full max-w-48 my-1.5"/>}>
                                   <FindPopup triggerButton={(
                                        <DropdownMenuItem onSelect={e=>e.preventDefault()}>
                                             {t("find.action")}
                                        </DropdownMenuItem>
                                   )}/>
                              </Suspense>
                              <DropdownMenuItem onClick={()=>findAction("next")}>
                                   {t("find.next")}
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={()=>findAction("prev")}>
                                   {t("find.prev")}
                              </DropdownMenuItem>
                         </DropdownMenuContent>
                    </DropdownMenu>
               )}
               {toolbars.findMissing && (
                    <Button variant="secondary" size={settings.compactToolbar ? "icon" : "default"} className={buttonClass} title={t("find.missing")} onClick={()=>findAction("missing")}>
                         <SearchSlash/>
                    </Button>
               )}
               {toolbars.replace && (
                    <Suspense fallback={<Skeleton className={loaderClass}/>}>
                         <ReplaceTranslationPopup triggerButton={(
                              <Button variant="secondary" size={settings.compactToolbar ? "icon" : "default"} className={buttonClass} title={t("replace")}>
                                   <RotateCcw/>
                              </Button>
                         )}/>
                    </Suspense>
               )}
               {toolbars.batchRename && (
                    <Suspense fallback={<Skeleton className={loaderClass}/>}>
                         <BatchRenameKeysPopup triggerButton={(
                              <Button variant="secondary" size={settings.compactToolbar ? "icon" : "default"} className={buttonClass} title={t("batch-rename")}>
                                   <FolderPen/>
                              </Button>
                         )}/>
                    </Suspense>
               )}
               {toolbars.selectUntranslated && (
                    <Button variant="secondary" size={settings.compactToolbar ? "icon" : "default"} className={buttonClass} title={t("select-untranslated")} onClick={()=>EditActions.selectUntranslated(table, setSelectedKeys)}>
                         <Scan/>
                    </Button>
               )}
               {toolbars.addToGlossary && (
                    <Suspense fallback={<Skeleton className={loaderClass}/>}>
                         <AddToGlossaryPopup triggerButton={(
                              <Button variant="secondary" size={settings.compactToolbar ? "icon" : "default"} className={buttonClass} title={t("glossary.add")}>
                                   <BookPlus/>
                              </Button>
                         )}/>
                    </Suspense>
               )}
               {toolbars.autoTranslate && (
                    <DropdownMenu modal={false}>
                         <DropdownMenuTrigger asChild>
                              <Button variant="secondary" size={settings.compactToolbar ? "icon" : "default"} className={buttonClass} title={t("auto-translate.title")}>
                                   <Languages/>
                              </Button>
                         </DropdownMenuTrigger>
                         <DropdownMenuContent className="w-full min-w-48">
                              <DropdownMenuLabel>{t("auto-translate.action")}</DropdownMenuLabel>
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
                                             triggerButton={<DropdownMenuItem disabled onSelect={e=>e.preventDefault()}>{name}</DropdownMenuItem>}
                                        />
                                   ))}
                              </Suspense>
                         </DropdownMenuContent>
                    </DropdownMenu>
               )}
               {toolbars.validateKeys && (
                    <Button variant="secondary" size={settings.compactToolbar ? "icon" : "default"} className={buttonClass} title={t("validate-keys.title")} onClick={validateKeys}>
                         <SearchCheck/>
                    </Button>
               )}
               {toolbars.removeUnusedKeys && (
                    <Button variant="secondary" size={settings.compactToolbar ? "icon" : "default"} className={buttonClass} title={t("remove-unused")} onClick={removeUnusedKeys}>
                         <Delete/>
                    </Button>
               )}
               {toolbars.transliterate && (
                    <Suspense fallback={<Skeleton className={loaderClass}/>}>
                         <TransliterateScriptPopup triggerButton={(
                              <Button variant="secondary" disabled size={settings.compactToolbar ? "icon" : "default"} className={buttonClass} title={t("transliterate")}>
                                   <RefreshCcw/>
                              </Button>
                         )}/>
                    </Suspense>
               )}
               {toolbars.glossaryManager && (
                    <Suspense fallback={<Skeleton className={loaderClass}/>}>
                         <GlossaryManagerPopup triggerButton={(
                              <Button variant="secondary" size={settings.compactToolbar ? "icon" : "default"} className={buttonClass} title={t("glossary.manager")}>
                                   <BookOpen/>
                              </Button>
                         )}/>
                    </Suspense>
               )}
               {toolbars.spellCheck && (
                    <Suspense fallback={<Skeleton className={loaderClass}/>}>
                         <SpellCheckPopup triggerButton={(
                              <Button disabled variant="secondary" size={settings.compactToolbar ? "icon" : "default"} className={buttonClass} title={t("spell-check")}>
                                   <SpellCheckIcon/>
                              </Button>
                         )}/>
                    </Suspense>
               )}
          </div>
     )
}