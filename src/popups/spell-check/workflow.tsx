import AppModal from "@/components/popups/modal";
import type { PopupComponentProps } from "@/lib/types/props";
import { SpellCheckWorkflowLoader } from "@/loaders/contents/spell-check";
import { lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { usePopupOpen } from "@/hooks/use-popup-open";

const SpellCheckWorkflow = lazy(()=>import("@/contents/spell-check/workflow"));

export default function SpellCheckWorkflowPopup({open, setOpen, modal=true}: PopupComponentProps){
     const {t} = useTranslation("spell-checker")
     const {actualOpen, setActualOpen} = usePopupOpen({open, setOpen})
     return (
          <AppModal
               size="lg"
               title={t("title")}
               description={t("desc")}
               open={actualOpen}
               onOpenChange={setActualOpen}
               modal={modal}
          >
               <Suspense fallback={<SpellCheckWorkflowLoader/>}>
                    <SpellCheckWorkflow/>
               </Suspense>
          </AppModal>
     )
}