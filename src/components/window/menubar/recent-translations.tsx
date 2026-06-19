import { MenubarItem, MenubarSub, MenubarSubContent, MenubarSubTrigger } from "@/components/ui/menubar";
import { useAppTranslation } from "@/context/translation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/utils";
import RecentTranslations, {RecentTranslation} from "@/lib/store/recent-translations";
import { TranslationFormat } from "@/lib/types/enums";

export default function RecentTranslationsMenu(){
     const {files, setTable, setFiles, updateLangs, setBaseKeys, setIsDirty} = useAppTranslation()
     const [isOpening, setIsOpening] = useState(false)
     const [recentTranslations, setRecentTranslations] = useState<RecentTranslation[]>([])
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
     return recentTranslations.length<=0 ? (
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
     )
}