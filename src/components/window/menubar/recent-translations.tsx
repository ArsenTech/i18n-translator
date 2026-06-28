import { MenubarItem, MenubarSub, MenubarSubContent, MenubarSubTrigger } from "@/components/ui/menubar";
import { useAppTranslation } from "@/context/translation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/utils";
import RecentTranslations, {RecentTranslation} from "@/lib/store/recent-translations";
import { TranslationFormat } from "@/lib/types/enums";
import { useTranslation } from "react-i18next";

export default function RecentTranslationsMenu(){
     const {t} = useTranslation("menubar",{
          keyPrefix: "file.open"
     })
     const {t: msgTxt} = useTranslation("menubar",{
          keyPrefix: "messages"
     })
     const {t: validationTxt} = useTranslation("validation")
     const {files, setTable, setFiles, updateLangs, setBaseKeys, setIsDirty, recentTranslations, setRecentTranslations} = useAppTranslation()
     const [isOpening, setIsOpening] = useState(false)
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
               const res = item.format=== TranslationFormat.Xliff ? await RecentTranslations.openRecentXliff(item,validationTxt) : await RecentTranslations.openRecent(item,validationTxt)
               if(res.error) toast.error(msgTxt("open-error"),{
                    description: res.error,
                    id: "open-error"
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
               toast.error(msgTxt("open-error"),{
                    description: getErrorMessage(err),
                    id: "open-error"
               })
          } finally {
               setIsOpening(false)
          }
     }
     return recentTranslations.length<=0 ? (
          <MenubarItem disabled>{t("recent")}</MenubarItem>
     ) : (
          <MenubarSub>
               <MenubarSubTrigger>
                    {t("recent")}
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