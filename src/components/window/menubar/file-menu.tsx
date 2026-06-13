import { MenubarContent, MenubarGroup, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from "../../ui/menubar";
import { exit } from '@tauri-apps/plugin-process';
import FileActions from "@/actions/file";
import { useAppTranslation } from "@/context/translation";
import NewTranslationPopup from "@/popups/modals/new-translation";
import OpenTranslationPopup from "@/popups/modals/open-translation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/utils";
import RecentTranslations, {RecentTranslation} from "@/lib/store/recent-translations";

export default function FileMenu(){
     const {table, files, setTable, setFiles, updateLangs, setBaseKeys, setIsDirty} = useAppTranslation()
     const [isSaving, setIsSaving] = useState(false)
     const [isOpening, setIsOpening] = useState(false)
     const [recentTranslations, setRecentTranslations] = useState<RecentTranslation[]>([])
     const save = async (type: "save-as" | "save-all" = "save-all") => {
          if(isSaving) return;
          setIsSaving(true)
          try {
               const res = type==="save-as" ? await FileActions.saveAs(table) : await FileActions.saveAll(table,files.targetPath)
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
     },[recentTranslations])
     const openRecent = async(item: RecentTranslation) =>{
          if(isOpening) return;
          setIsOpening(true)
          try {
               const res = await RecentTranslations.openRecent(item)
               if(res.error) toast.error("Failed to save the file",{
                    description: res.error
               })
               if(res.success) {
                    toast.success(res.success);
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
               setIsSaving(false)
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
                         <OpenTranslationPopup triggerButton={(
                              <MenubarItem onSelect={(e) => e.preventDefault()}>Open Translations</MenubarItem>
                         )}/>
                         {recentTranslations.length<=0 ? (
                              <MenubarItem disabled>Recent Translations</MenubarItem>
                         ) : (
                              <MenubarSub>
                                   <MenubarSubTrigger>
                                        Recent Translations
                                   </MenubarSubTrigger>
                                   <MenubarSubContent>
                                        {recentTranslations.map(item => (
                                             <MenubarItem
                                                  key={item.targetPath}
                                                  onClick={() => openRecent(item)}
                                             >
                                                  {item.name}
                                             </MenubarItem>
                                        ))}
                                   </MenubarSubContent>
                              </MenubarSub>
                         )}
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