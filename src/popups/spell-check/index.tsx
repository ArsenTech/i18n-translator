import AppModal from "@/components/popups/modal";
import type { PopupComponentProps } from "@/lib/types/props";
import { lazy, Suspense, useState } from "react";
import { SpellCheckerLoader } from "@/loaders/contents/spell-check";
import { useTranslation } from "react-i18next";

const SpellChecker = lazy(()=>import("@/contents/spell-check"));

export default function SpellCheckPopup({triggerButton}: PopupComponentProps){
     const {t} = useTranslation("spell-checker")
     const [open, setOpen] = useState(false)
     return (
          <AppModal
               size="sm"
               title={t("title")}
               description={t("desc")}
               triggerButton={triggerButton}
               open={open} onOpenChange={setOpen}
          >
               <Suspense fallback={<SpellCheckerLoader/>}>
                    <SpellChecker/>
               </Suspense>
          </AppModal>
     )
}