import AppModal from "@/components/popups/modal";
import type { PopupComponentProps } from "@/lib/types/props";
import { SpellCheckSummaryLoader } from "@/loaders/contents/spell-check";
import { lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";

const SpellCheckSummary = lazy(()=>import("@/contents/spell-check/summary"));

export default function SpellCheckSummaryPopup({open, setOpen}: PopupComponentProps){
     const {t} = useTranslation("spell-checker")
     return (
          <AppModal
               size="sm"
               title={t("summary.title")}
               open={open}
               onOpenChange={setOpen}
          >
               <Suspense fallback={<SpellCheckSummaryLoader/>}>
                    <SpellCheckSummary/>
               </Suspense>
          </AppModal>
     )
}