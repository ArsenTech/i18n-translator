import AppModal from "@/components/popups/modal";
import type { PopupComponentProps } from "@/lib/types/props";
import { GlossaryManagerLoader } from "@/loaders/contents";
import { lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { usePopupOpen } from "@/hooks/use-popup-open";

const GlossaryManager = lazy(()=>import("@/contents/glossary-manager"));

export default function GlossaryManagerPopup({triggerButton, modal=true, open, setOpen}: PopupComponentProps){
     const {t} = useTranslation("glossary",{
          keyPrefix: "manager"
     })
     const {actualOpen, setActualOpen} = usePopupOpen({open, setOpen})
     return (
          <AppModal
               title={t("title")}
               description={t("desc")}
               size="xl"
               triggerButton={triggerButton}
               modal={modal}
               open={actualOpen}
               onOpenChange={setActualOpen}
          >
               <Suspense fallback={<GlossaryManagerLoader/>}>
                    <GlossaryManager/>
               </Suspense>
          </AppModal>
     )
}