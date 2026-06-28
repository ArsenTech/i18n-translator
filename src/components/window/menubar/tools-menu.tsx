import { MenubarContent, MenubarItem, MenubarMenu, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from "@/components/ui/menubar";
import TranslatorActions from "@/actions/translator";
import { PROVIDER_NAMES } from "@/lib/constants";
import { AutoTranslateProvider } from "@/schemas/types";
import { useAppTranslation } from "@/context/translation";
import { toast } from "sonner";
import { lazy, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "react-i18next";

const AutoTranslatePopup = lazy(()=>import("@/popups/auto-translate"));
const TransliterateScriptPopup = lazy(()=>import("@/popups/transliterate-script"));
const SpellCheckPopup = lazy(()=>import("@/popups/spell-check"));
const GlossaryManagerPopup = lazy(()=>import("@/popups/glossary-manager"));

export default function ToolsMenu(){
     const {t} = useTranslation("menubar",{
          keyPrefix: "tools"
     })
     const {t: msgTxt} = useTranslation("menubar",{
          keyPrefix: "messages"
     })
     const {t: validationTxt} = useTranslation("validation")
     const {setTable, table, baseKeys, setIsDirty} = useAppTranslation()
     const removeUnusedKeys = () => {
          const res = TranslatorActions.removeUnusedKeys(table,baseKeys,validationTxt)
          if(res.success) {
               toast.success(res.success)
               setTable(res.data)
               setIsDirty(true)
          }
     }
     const validateKeys = () => {
          const res = TranslatorActions.validateKeys(table, baseKeys)
          if (res.success) {
               toast.success(msgTxt("keys.valid"))
          } else {
               toast.error(msgTxt("keys.invalid",{count: res.count}))
          }
     }
     return (
          <MenubarMenu>
               <MenubarTrigger className="tracking-tight">{t("title")}</MenubarTrigger>
               <MenubarContent>
                    <MenubarSub>
                         <MenubarSubTrigger>{t("translate-using")}</MenubarSubTrigger>
                         <MenubarSubContent>
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
                                             triggerButton={<MenubarItem disabled onSelect={(e) => e.preventDefault()}>{name}</MenubarItem>}
                                        />
                                   ))}
                              </Suspense>
                         </MenubarSubContent>
                    </MenubarSub>
                    <MenubarSub>
                         <MenubarSubTrigger>{t("validation.title")}</MenubarSubTrigger>
                         <MenubarSubContent>
                              <MenubarItem onClick={validateKeys}>{t("validation.keys")}</MenubarItem>
                              <MenubarItem onClick={removeUnusedKeys}>{t("validation.remove-unused")}</MenubarItem>
                              <Suspense fallback={<Skeleton className="h-5 w-full max-w-48 my-1.5"/>}>
                                   <SpellCheckPopup triggerButton={(
                                        <MenubarItem disabled onSelect={(e) => e.preventDefault()}>{t("validation.spell-check")}</MenubarItem>
                                   )}/>
                              </Suspense>
                         </MenubarSubContent>
                    </MenubarSub>
                    <Suspense fallback={(
                         <>
                         <Skeleton className="h-5 w-full max-w-48 my-1.5"/>
                         <Skeleton className="h-5 w-full max-w-48 my-1.5"/>
                         </>
                    )}>
                         <TransliterateScriptPopup triggerButton={(
                              <MenubarItem disabled onSelect={(e) => e.preventDefault()}>{t("transliterate")}</MenubarItem>
                         )}/>
                         <GlossaryManagerPopup triggerButton={(
                              <MenubarItem onSelect={e=>e.preventDefault()}>{t("glossary")}</MenubarItem>
                         )}/>
                    </Suspense>
               </MenubarContent>
          </MenubarMenu>
     )
}