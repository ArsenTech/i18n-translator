import AppModal from "@/components/popups/modal";
import type { PopupComponentProps } from "@/lib/types/props";
import { TransliterateScriptLoader } from "@/loaders/contents/form";
import { lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";

const TransliterateScript = lazy(()=>import("@/contents/transliterate-script"));

export default function TransliterateScriptPopup({triggerButton}: PopupComponentProps){
     const {t} = useTranslation("transliterate")
     return (
          <AppModal
               size="sm"
               title={t("title")}
               description={t("desc")}
               triggerButton={triggerButton}
          >
               <Suspense fallback={<TransliterateScriptLoader/>}>
                    <TransliterateScript/>
               </Suspense>
          </AppModal>
     )
}