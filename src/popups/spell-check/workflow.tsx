import AppModal from "@/components/popups/modal";
import type { PopupComponentProps } from "@/lib/types/props";
import { SpellCheckWorkflowLoader } from "@/loaders/contents/spell-check";
import { lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";

const SpellCheckWorkflow = lazy(()=>import("@/contents/spell-check/workflow"));

export default function SpellCheckWorkflowPopup({open, setOpen}: PopupComponentProps){
     const {t} = useTranslation("spell-checker")
     return (
          <AppModal
               size="lg"
               title={t("title")}
               description={t("desc")}
               open={open}
               onOpenChange={setOpen}
          >
               <Suspense fallback={<SpellCheckWorkflowLoader/>}>
                    <SpellCheckWorkflow/>
               </Suspense>
          </AppModal>
     )
}