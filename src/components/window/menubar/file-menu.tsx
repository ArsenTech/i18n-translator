import { MenubarContent, MenubarGroup, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from "@/components/ui/menubar";
import { exit } from '@tauri-apps/plugin-process';
import FileActions from "@/actions/file";
import { useAppTranslation } from "@/context/translation";
import { lazy, Suspense, useState } from "react";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useSettings } from "@/context/settings";
import { useTranslation } from "react-i18next";
import useDialogFilters from "@/hooks/use-dialog-filter";

const RecentTranslationsMenu = lazy(()=>import("./recent-translations"));
const NewTranslationPopup = lazy(()=>import("@/popups/new-translation"));
const OpenTranslationPopup = lazy(()=>import("@/popups/open-translation"));
const OpenXliffPopup = lazy(()=>import("@/popups/open-xliff"));

export default function FileMenu(){
     const {t} = useTranslation("menubar",{
          keyPrefix: "file"
     })
     const {t: msgTxt} = useTranslation("menubar",{
          keyPrefix: "messages"
     })
     const {t: validationTxt} = useTranslation("validation")
     const filters = useDialogFilters(true)
     const {settings} = useSettings()
     const {table, files, setIsDirty, reset, langs} = useAppTranslation()
     const [isSaving, setIsSaving] = useState(false)
     const save = async (type: "save-as" | "save-all" = "save-all") => {
          if(isSaving) return;
          setIsSaving(true)
          try {
               const res = type==="save-as" ? await FileActions.saveAs(table, langs, settings.preserveEmpty, settings.xliffPreserveMeta, validationTxt, filters) : await FileActions.saveAll(table, files.targetPath, langs, settings.preserveEmpty, settings.xliffPreserveMeta, validationTxt)
               if(res?.error) toast.error(msgTxt("save-error"),{
                    description: res.error
               })
               if(res?.success) {
                    toast.success(res.success)
                    setIsDirty(false)
               }
          } catch (err){
               toast.error(msgTxt("save-error"),{
                    description: getErrorMessage(err)
               })
          } finally {
               setIsSaving(false)
          }
     }
     return (
          <MenubarMenu>
               <MenubarTrigger className="tracking-tight">{t("title")}</MenubarTrigger>
               <MenubarContent>
                    <MenubarGroup>
                         <Suspense fallback={<Skeleton className="h-5 w-full max-w-48 my-1.5"/>}>
                              <NewTranslationPopup triggerButton={(
                                   <MenubarItem onSelect={(e) => e.preventDefault()}>
                                        {t("new")}
                                        <MenubarShortcut>Ctrl+N</MenubarShortcut>
                                   </MenubarItem>
                              )}/>
                         </Suspense>
                         <MenubarSub>
                              <MenubarSubTrigger>
                                   {t("open.title")}
                              </MenubarSubTrigger>
                              <MenubarSubContent>
                                   <Suspense fallback={(
                                        <>
                                        <Skeleton className="h-5 w-full max-w-48 my-1.5"/>
                                        <Skeleton className="h-5 w-full max-w-48 my-1.5"/>
                                        </>
                                   )}>
                                        <OpenTranslationPopup triggerButton={(
                                             <MenubarItem onSelect={(e) => e.preventDefault()} disabled={!!files.format}>
                                                  {t("open.action")}
                                                  <MenubarShortcut>Ctrl+O</MenubarShortcut>
                                             </MenubarItem>
                                        )}/>
                                        <OpenXliffPopup triggerButton={(
                                             <MenubarItem onSelect={(e) => e.preventDefault()} disabled={!!files.format}>
                                                  {t("open.xliff")}
                                                  <MenubarShortcut>Ctrl+Shift+O</MenubarShortcut>
                                             </MenubarItem>
                                        )}/>
                                   </Suspense>
                              </MenubarSubContent>
                         </MenubarSub>
                         <Suspense fallback={<Skeleton className="h-5 w-full max-w-48 my-1.5"/>}>
                              <RecentTranslationsMenu/>
                         </Suspense>
                         <MenubarItem onClick={reset} disabled={!files.format}>{t("close")}</MenubarItem>
                    </MenubarGroup>
                    <MenubarSeparator/>
                    <MenubarGroup>
                         <MenubarItem disabled={isSaving} onClick={()=>save("save-all")}>
                              {t("save")}
                              <MenubarShortcut>Ctrl+S</MenubarShortcut>
                         </MenubarItem>
                         <MenubarItem disabled={isSaving} onClick={()=>save("save-as")}>
                              {t("save-as")}
                              <MenubarShortcut>Ctrl+Shift+S</MenubarShortcut>
                         </MenubarItem>
                    </MenubarGroup>
                    <MenubarSeparator/>
                    <MenubarItem onClick={()=>exit(0)}>
                         {t("exit")}
                         <MenubarShortcut>Alt+F4</MenubarShortcut>
                    </MenubarItem>
               </MenubarContent>
          </MenubarMenu>
     )
}