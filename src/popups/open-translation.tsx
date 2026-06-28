import AppModal from "@/components/popups/modal";
import type { PopupComponentProps } from "@/lib/types/props";
import { lazy, Suspense, useState } from "react";
import { OpenTranslationLoader } from "@/loaders/contents/form";
import { useTranslation } from "react-i18next";

const OpenTranslation = lazy(()=>import("@/contents/open-translation"));

export default function OpenTranslationPopup({triggerButton}: PopupComponentProps){
     const {t} = useTranslation("file-actions",{
          keyPrefix: "open"
     })
     const [open, setOpen] = useState(false)
     return (
          <AppModal
               open={open}
               onOpenChange={setOpen}
               title={t("title")}
               description={t("desc")}
               triggerButton={triggerButton}
          >
               <Suspense fallback={<OpenTranslationLoader/>}>
                    <OpenTranslation setOpen={setOpen}/>
               </Suspense>
          </AppModal>
     )
}