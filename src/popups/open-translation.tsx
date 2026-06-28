import AppModal from "@/components/popups/modal";
import type { PopupComponentProps } from "@/lib/types/props";
import { lazy, Suspense } from "react";
import { OpenTranslationLoader } from "@/loaders/contents/form";
import { useTranslation } from "react-i18next";
import { usePopupOpen } from "@/hooks/use-popup-open";

const OpenTranslation = lazy(()=>import("@/contents/open-translation"));

export default function OpenTranslationPopup({triggerButton, modal=true, open, setOpen}: PopupComponentProps){
     const {t} = useTranslation("file-actions",{
          keyPrefix: "open"
     })
     const {actualOpen, setActualOpen} = usePopupOpen({open, setOpen})
     return (
          <AppModal
               open={actualOpen}
               onOpenChange={setActualOpen}
               title={t("title")}
               description={t("desc")}
               triggerButton={triggerButton}
               modal={modal}
          >
               <Suspense fallback={<OpenTranslationLoader/>}>
                    <OpenTranslation setOpen={setActualOpen}/>
               </Suspense>
          </AppModal>
     )
}