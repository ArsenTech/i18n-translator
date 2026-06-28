import AppModal from "@/components/popups/modal";
import type { PopupComponentProps } from "@/lib/types/props";
import { lazy, Suspense } from "react";
import { NewTranslationLoader } from "@/loaders/contents/form";
import { useTranslation } from "react-i18next";
import { usePopupOpen } from "@/hooks/use-popup-open";

const NewTranslation = lazy(()=>import("@/contents/new-translation"));

export default function NewTranslationPopup({triggerButton, modal=true, open, setOpen}: PopupComponentProps){
     const {t} = useTranslation("file-actions",{
          keyPrefix: "new"
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
               <Suspense fallback={<NewTranslationLoader/>}>
                    <NewTranslation setOpen={setActualOpen}/>
               </Suspense>
          </AppModal>
     )
}