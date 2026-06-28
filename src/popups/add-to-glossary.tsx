import AppModal from "@/components/popups/modal";
import type { PopupComponentProps } from "@/lib/types/props";
import { AddToGlossaryLoader } from "@/loaders/contents/form";
import { lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";

const AddToGlossary = lazy(()=>import("@/contents/add-to-glossary"));

export default function AddToGlossaryPopup({triggerButton}: PopupComponentProps){
     const {t} = useTranslation("glossary",{
          keyPrefix: "add-glossary"
     })
     return (
          <AppModal
               title={t("title")}
               description={t("desc")}
               triggerButton={triggerButton}
          >
               <Suspense fallback={<AddToGlossaryLoader/>}>
                    <AddToGlossary/>
               </Suspense>
          </AppModal>
     )
}