import AppModal from "@/components/popups/modal";
import type { PopupComponentProps } from "@/lib/types/props";
import { GlossaryManagerLoader } from "@/loaders/contents";
import { lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";

const GlossaryManager = lazy(()=>import("@/contents/glossary-manager"));

export default function GlossaryManagerPopup({triggerButton}: PopupComponentProps){
     const {t} = useTranslation("glossary",{
          keyPrefix: "manager"
     })
     return (
          <AppModal
               title={t("title")}
               description={t("desc")}
               size="xl"
               triggerButton={triggerButton}
          >
               <Suspense fallback={<GlossaryManagerLoader/>}>
                    <GlossaryManager/>
               </Suspense>
          </AppModal>
     )
}