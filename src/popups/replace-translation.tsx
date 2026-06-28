import AppModal from "@/components/popups/modal";
import type { PopupComponentProps } from "@/lib/types/props";
import { lazy, Suspense } from "react";
import { ReplaceTranslationLoader } from "@/loaders/contents/form";
import { useTranslation } from "react-i18next";
import { usePopupOpen } from "@/hooks/use-popup-open";

const ReplaceTranslation = lazy(()=>import("@/contents/replace-translation"));

export default function ReplaceTranslationPopup({triggerButton, modal=true, open, setOpen}: PopupComponentProps){
     const {t} = useTranslation("replace")
     const {actualOpen, setActualOpen} = usePopupOpen({open, setOpen})
     return (
          <AppModal
               size="sm"
               title={t("title")}
               description={t("desc")}
               triggerButton={triggerButton}
               open={actualOpen}
               onOpenChange={setActualOpen}
               modal={modal}
          >
               <Suspense fallback={<ReplaceTranslationLoader/>}>
                    <ReplaceTranslation setOpen={setActualOpen}/>
               </Suspense>
          </AppModal>
     )
}