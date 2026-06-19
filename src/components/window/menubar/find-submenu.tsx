import { MenubarGroup, MenubarItem, MenubarShortcut, MenubarSub, MenubarSubContent, MenubarSubTrigger } from "@/components/ui/menubar";
import FindActions, { FindResult } from "@/actions/find";
import TranslatorActions from "@/actions/translator";
import { useAppTranslation } from "@/context/translation";
import { toast } from "sonner";
import { lazy, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const FindPopup = lazy(()=>import("@/popups/find"));

export default function FindSubmenu(){
     const {findState, setFindState, setCurrentTranslation, setInput, setVisibleCount, visibleTable} = useAppTranslation()
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
     return (
          <MenubarSub>
               <MenubarSubTrigger>Find</MenubarSubTrigger>
               <MenubarSubContent>
                    <MenubarGroup>
                         <Suspense fallback={<Skeleton className="h-5 w-full max-w-48 my-1.5"/>}>
                              <FindPopup triggerButton={(
                                   <MenubarItem onSelect={(e) => e.preventDefault()}>
                                        Find...
                                        <MenubarShortcut>Ctrl+F</MenubarShortcut>
                                   </MenubarItem>
                              )}/>
                         </Suspense>
                         <MenubarItem onClick={() => findAction("next")}>Find Next</MenubarItem>
                         <MenubarItem onClick={() => findAction("prev")}>Find Previous</MenubarItem>
                         <MenubarItem onClick={() => findAction("missing")}>Find Missing Keys</MenubarItem>
                    </MenubarGroup>
               </MenubarSubContent>
          </MenubarSub>
     )
}