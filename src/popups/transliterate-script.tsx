import AppModal from "@/components/popups/modal";
import type { PopupComponentProps } from "@/lib/types/props";
import { TransliterateScriptLoader } from "@/loaders/contents/form";
import { lazy, Suspense } from "react";

const TransliterateScript = lazy(()=>import("@/contents/transliterate-script"));

export default function TransliterateScriptPopup({triggerButton}: PopupComponentProps){
     return (
          <AppModal
               size="sm"
               title="Transliterate Script"
               description="Transliterate translation scripts"
               triggerButton={triggerButton}
          >
               <Suspense fallback={<TransliterateScriptLoader/>}>
                    <TransliterateScript/>
               </Suspense>
          </AppModal>
     )
}