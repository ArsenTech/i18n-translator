import { MenubarGroup, MenubarItem, MenubarShortcut, MenubarSub, MenubarSubContent, MenubarSubTrigger } from "@/components/ui/menubar";
import FindActions from "@/actions/find";
import TranslatorActions from "@/actions/translator";
import { useAppTranslation } from "@/context/translation";
import { toast } from "sonner";
import { lazy, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useEditor } from "@/context/editor";
import type { FindResult } from "@/lib/types/find";
import { useTranslation } from "react-i18next";

const FindPopup = lazy(()=>import("@/popups/find"));

export default function FindSubmenu(){
     const {t} = useTranslation("menubar")
     const {t: validationTxt} = useTranslation("validation")
     const {findState, setFindState, setCurrentTranslation, setInput, setVisibleCount} = useEditor();
     const {visibleTable} = useAppTranslation()
     const findAction = (type: "next" | "prev" | "missing") => {
          const res: FindResult = type==="next" ? FindActions.findNext(findState, validationTxt) : type==="prev" ? FindActions.findPrev(findState, validationTxt) : type==="missing" ? FindActions.findMissing(visibleTable, validationTxt) : {success: false, error: t("messages.unknown-find")}
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
               toast.error(t("messages.query-error"),{
                    description: res.error
               })
          }
     }
     return (
          <MenubarSub>
               <MenubarSubTrigger>{t("edit.find.title")}</MenubarSubTrigger>
               <MenubarSubContent>
                    <MenubarGroup>
                         <Suspense fallback={<Skeleton className="h-5 w-full max-w-48 my-1.5"/>}>
                              <FindPopup triggerButton={(
                                   <MenubarItem onSelect={(e) => e.preventDefault()}>
                                        {t("edit.find.action")}
                                        <MenubarShortcut>Ctrl+F</MenubarShortcut>
                                   </MenubarItem>
                              )}/>
                         </Suspense>
                         <MenubarItem onClick={() => findAction("next")}>{t("edit.find.next")}</MenubarItem>
                         <MenubarItem onClick={() => findAction("prev")}>{t("edit.find.prev")}</MenubarItem>
                         <MenubarItem onClick={() => findAction("missing")}>{t("edit.find.missing")}</MenubarItem>
                    </MenubarGroup>
               </MenubarSubContent>
          </MenubarSub>
     )
}