import { MenubarContent, MenubarGroup, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from "../../ui/menubar";
import { exit } from '@tauri-apps/plugin-process';
import FileActions from "@/actions/file";
import { useAppTranslation } from "@/context/translation";
import NewTranslationPopup from "@/popups/new-translation";
import OpenTranslationPopup from "@/popups/open-translation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/utils";
import RecentTranslations, {RecentTranslation} from "@/lib/store/recent-translations";
import OpenXliffPopup from "@/popups/open-xliff";
import { TranslationFormat } from "@/lib/types/enums";

export default function FileMenu(){
     const {table, files, setTable, setFiles, updateLangs, setBaseKeys, setIsDirty, reset, langs} = useAppTranslation()
     const [isSaving, setIsSaving] = useState(false)
     const [isOpening, setIsOpening] = useState(false)
     const [recentTranslations, setRecentTranslations] = useState<RecentTranslation[]>([])
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
     useEffect(()=>{
          (async()=>{
               const recent = await RecentTranslations.getRecent();
               setRecentTranslations(recent)
          })()
     },[])
     const openRecent = async(item: RecentTranslation) =>{
          if(isOpening) return;
          setIsOpening(true)
          try {
               const res = item.format=== TranslationFormat.Xliff ? await RecentTranslations.openRecentXliff(item) : await RecentTranslations.openRecent(item)
               if(res.error) toast.error("Failed to save the file",{
                    description: res.error
               })
               if(res.success) {
                    toast.success(res.success);
                    console.log(res.data.filter(val=>val.baseString.includes("xpression")))
                    setTable(res.data)
                    setBaseKeys(new Set(res.data.map(item => item.keyName)))
                    setFiles({
                         basePath: item.basePath,
                         targetPath: item.targetPath,
                         format: item.format
                    })
                    updateLangs({
                         base: item.baseLang,
                         target: item.targetLang
                    })
                    setIsDirty(false)
               }
          } catch (err){
               toast.error("Failed to save the file",{
                    description: getErrorMessage(err)
               })
          } finally {
               setIsOpening(false)
          }
     }
     return (
          <MenubarMenu>
               <MenubarTrigger className="tracking-tight">File</MenubarTrigger>
               <MenubarContent>
                    <MenubarGroup>
                         <NewTranslationPopup triggerButton={(
                              <MenubarItem onSelect={(e) => e.preventDefault()}>New Translation</MenubarItem>
                         )}/>
                         <MenubarSub>
                              <MenubarSubTrigger>
                                   Open Translations
                              </MenubarSubTrigger>
                              <MenubarSubContent>
                                   <OpenTranslationPopup triggerButton={(
                                        <MenubarItem onSelect={(e) => e.preventDefault()} disabled={!!files.format}>Open...</MenubarItem>
                                   )}/>
                                   <OpenXliffPopup triggerButton={(
                                        <MenubarItem onSelect={(e) => e.preventDefault()} disabled={!!files.format}>Open XLIFF File</MenubarItem>
                                   )}/>
                              </MenubarSubContent>
                         </MenubarSub>
                         {recentTranslations.length<=0 ? (
                              <MenubarItem disabled>Recent Translations</MenubarItem>
                         ) : (
                              <MenubarSub>
                                   <MenubarSubTrigger>
                                        Recent Translations
                                   </MenubarSubTrigger>
                                   <MenubarSubContent>
                                        {recentTranslations.map((item,i) => (
                                             <MenubarItem
                                                  key={`${item.targetPath}-${i+1}`}
                                                  onClick={() => openRecent(item)}
                                                  disabled={!!files.format}
                                             >
                                                  {item.name}
                                             </MenubarItem>
                                        ))}
                                   </MenubarSubContent>
                              </MenubarSub>
                         )}
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