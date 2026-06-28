import AppModal from "@/components/popups/modal";
import type { PopupComponentProps } from "@/lib/types/props";
import { lazy, Suspense } from "react";
import { SpellCheckerLoader } from "@/loaders/contents/spell-check";
import { useTranslation } from "react-i18next";
import { usePopupOpen } from "@/hooks/use-popup-open";

const SpellChecker = lazy(()=>import("@/contents/spell-check"));

export default function SpellCheckPopup({triggerButton, modal=true, open, setOpen}: PopupComponentProps){
     const {t} = useTranslation("spell-checker")
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
               <Suspense fallback={<SpellCheckerLoader/>}>
                    <SpellChecker/>
               </Suspense>
          </AppModal>
     )
}