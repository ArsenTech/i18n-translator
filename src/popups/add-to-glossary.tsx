import AppModal from "@/components/popups/modal";
import type { PopupComponentProps } from "@/lib/types/props";
import { AddToGlossaryLoader } from "@/loaders/contents/form";
import { lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { usePopupOpen } from "@/hooks/use-popup-open";

const AddToGlossary = lazy(()=>import("@/contents/add-to-glossary"));

export default function AddToGlossaryPopup({triggerButton, modal=true, open, setOpen}: PopupComponentProps){
     const {t} = useTranslation("glossary",{
          keyPrefix: "add-glossary"
     })
     const {actualOpen, setActualOpen} = usePopupOpen({open, setOpen})
     return (
          <AppModal
               title={t("title")}
               description={t("desc")}
               triggerButton={triggerButton}
               modal={modal}
               open={actualOpen}
               onOpenChange={setActualOpen}
          >
               <Suspense fallback={<AddToGlossaryLoader/>}>
                    <AddToGlossary/>
               </Suspense>
          </AppModal>
     )
}