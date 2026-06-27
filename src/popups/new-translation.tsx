import AppModal from "@/components/popups/modal";
import type { PopupComponentProps } from "@/lib/types/props";
import { lazy, Suspense, useState } from "react";
import { NewTranslationLoader } from "@/loaders/contents/form";
import { useTranslation } from "react-i18next";

const NewTranslation = lazy(()=>import("@/contents/new-translation"));

export default function NewTranslationPopup({triggerButton}: PopupComponentProps){
     const {t} = useTranslation("file-actions")
     const [open, setOpen] = useState(false)
     return (
          <AppModal
               open={open}
               onOpenChange={setOpen}
               title={t("new.title")}
               description={t("new.desc")}
               triggerButton={triggerButton}
          >
               <Suspense fallback={<NewTranslationLoader/>}>
                    <NewTranslation setOpen={setOpen}/>
               </Suspense>
          </AppModal>
     )
}