import AppModal from "@/components/popups/modal";
import { AutoTranslateProvider } from "@/schemas/types";
import { PROVIDER_NAMES } from "@/lib/constants";
import { PopupComponentProps } from "@/lib/types";
import { lazy, Suspense, useState } from "react";
import { AutoTranslateLoader } from "@/loaders/contents/form";

const AutoTranslate = lazy(()=>import("@/contents/auto-translate"));

interface AutoTranslatePopupProps extends PopupComponentProps{
     provider: AutoTranslateProvider
}
export default function AutoTranslatePopup({provider, triggerButton}: AutoTranslatePopupProps){
     const [open, setOpen] = useState(false)
     return (
          <AppModal
               title="Auto-Translate"
               description={`Auto-Translation using ${PROVIDER_NAMES[provider]}`}
               triggerButton={triggerButton}
               open={open} onOpenChange={setOpen}
          >
               <Suspense fallback={<AutoTranslateLoader provider={provider}/>}>
                    <AutoTranslate provider={provider} setOpen={setOpen}/>
               </Suspense>
          </AppModal>
     )
}