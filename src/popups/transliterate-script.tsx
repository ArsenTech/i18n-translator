import AppModal from "@/components/popups/modal";
import type { PopupComponentProps } from "@/lib/types/props";
import { TransliterateScriptLoader } from "@/loaders/contents/form";
import { lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { usePopupOpen } from "@/hooks/use-popup-open";

const TransliterateScript = lazy(()=>import("@/contents/transliterate-script"));

export default function TransliterateScriptPopup({triggerButton, modal=true, open, setOpen}: PopupComponentProps){
     const {t} = useTranslation("transliterate")
     const {actualOpen, setActualOpen} = usePopupOpen({open, setOpen})
     return (
          <AppModal
               size="sm"
               title={t("title")}
               description={t("desc")}
               triggerButton={triggerButton}
               modal={modal}
               open={actualOpen}
               onOpenChange={setActualOpen}
          >
               <Suspense fallback={<TransliterateScriptLoader/>}>
                    <TransliterateScript/>
               </Suspense>
          </AppModal>
     )
}