import { MenubarContent, MenubarGroup, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from "@/components/ui/menubar";
import { exit } from '@tauri-apps/plugin-process';
import FileActions from "@/actions/file";
import { useAppTranslation } from "@/context/translation";
import { lazy, Suspense, useState } from "react";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

const RecentTranslationsMenu = lazy(()=>import("./recent-translations"));
const NewTranslationPopup = lazy(()=>import("@/popups/new-translation"));
const OpenTranslationPopup = lazy(()=>import("@/popups/open-translation"));
const OpenXliffPopup = lazy(()=>import("@/popups/open-xliff"));

export default function FileMenu(){
     const {table, files, setIsDirty, reset, langs} = useAppTranslation()
     const [isSaving, setIsSaving] = useState(false)
     const save = async (type: "save-as" | "save-all" = "save-all") => {
          if(isSaving) return;
          setIsSaving(true)
          try {
               const res = type==="save-as" ? await FileActions.saveAs(table, langs) : await FileActions.saveAll(table, files.targetPath, langs)
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
     }
     return (
          <MenubarMenu>
               <MenubarTrigger className="tracking-tight">File</MenubarTrigger>
               <MenubarContent>
                    <MenubarGroup>
                         <Suspense fallback={<Skeleton className="h-5 w-full max-w-48 my-1.5"/>}>
                              <NewTranslationPopup triggerButton={(
                                   <MenubarItem onSelect={(e) => e.preventDefault()}>New Translation</MenubarItem>
                              )}/>
                         </Suspense>
                         <MenubarSub>
                              <MenubarSubTrigger>
                                   Open Translations
                              </MenubarSubTrigger>
                              <MenubarSubContent>
                                   <Suspense fallback={(
                                        <>
                                        <Skeleton className="h-5 w-full max-w-48 my-1.5"/>
                                        <Skeleton className="h-5 w-full max-w-48 my-1.5"/>
                                        </>
                                   )}>
                                        <OpenTranslationPopup triggerButton={(
                                             <MenubarItem onSelect={(e) => e.preventDefault()} disabled={!!files.format}>Open...</MenubarItem>
                                        )}/>
                                        <OpenXliffPopup triggerButton={(
                                             <MenubarItem onSelect={(e) => e.preventDefault()} disabled={!!files.format}>Open XLIFF File</MenubarItem>
                                        )}/>
                                   </Suspense>
                              </MenubarSubContent>
                         </MenubarSub>
                         <Suspense fallback={<Skeleton className="h-5 w-full max-w-48 my-1.5"/>}>
                              <RecentTranslationsMenu/>
                         </Suspense>
                         <MenubarItem onClick={reset} disabled={!files.format}>Close Current Translation</MenubarItem>
                    </MenubarGroup>
                    <MenubarSeparator/>
                    <MenubarGroup>
                         <MenubarItem disabled={isSaving} onClick={()=>save("save-all")}>Save <MenubarShortcut>Ctrl+S</MenubarShortcut></MenubarItem>
                         <MenubarItem disabled={isSaving} onClick={()=>save("save-as")}>Save As... <MenubarShortcut>Ctrl+Shift+S</MenubarShortcut></MenubarItem>
                    </MenubarGroup>
                    <MenubarSeparator/>
                    <MenubarItem onClick={()=>exit(0)}>Exit <MenubarShortcut>Alt+F4</MenubarShortcut></MenubarItem>
               </MenubarContent>
          </MenubarMenu>
     )
}