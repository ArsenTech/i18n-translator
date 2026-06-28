import AppModal from "@/components/popups/modal";
import type { PopupComponentProps } from "@/lib/types/props";
import { SpellCheckSummaryLoader } from "@/loaders/contents/spell-check";
import { lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { usePopupOpen } from "@/hooks/use-popup-open";

const SpellCheckSummary = lazy(()=>import("@/contents/spell-check/summary"));

export default function SpellCheckSummaryPopup({open, setOpen, modal=true}: PopupComponentProps){
     const {t} = useTranslation("spell-checker",{
          keyPrefix: "summary"
     })
     const {actualOpen, setActualOpen} = usePopupOpen({open, setOpen})
     return (
          <AppModal
               size="sm"
               title={t("title")}
               open={actualOpen}
               onOpenChange={setActualOpen}
               modal={modal}
          >
               <Suspense fallback={<SpellCheckSummaryLoader/>}>
                    <SpellCheckSummary/>
               </Suspense>
          </AppModal>
     )
}