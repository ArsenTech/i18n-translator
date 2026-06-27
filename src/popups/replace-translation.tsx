import AppModal from "@/components/popups/modal";
import type { PopupComponentProps } from "@/lib/types/props";
import { lazy, Suspense, useState } from "react";
import { ReplaceTranslationLoader } from "@/loaders/contents/form";
import { useTranslation } from "react-i18next";

const ReplaceTranslation = lazy(()=>import("@/contents/replace-translation"));

export default function ReplaceTranslationPopup({triggerButton}: PopupComponentProps){
     const {t} = useTranslation("replace")
     const [open, setOpen] = useState(false)
     return (
          <AppModal
               size="sm"
               title={t("title")}
               description={t("desc")}
               triggerButton={triggerButton}
               open={open} onOpenChange={setOpen}
          >
               <Suspense fallback={<ReplaceTranslationLoader/>}>
                    <ReplaceTranslation setOpen={setOpen}/>
               </Suspense>
          </AppModal>
     )
}