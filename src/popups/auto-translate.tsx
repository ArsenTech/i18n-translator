import AppModal from "@/components/popups/modal";
import { AutoTranslateProvider } from "@/schemas/types";
import { PROVIDER_NAMES } from "@/lib/constants";
import type { PopupComponentProps } from "@/lib/types/props";
import { lazy, Suspense, useState } from "react";
import { AutoTranslateLoader } from "@/loaders/contents/form";
import { useTranslation } from "react-i18next";

const AutoTranslate = lazy(()=>import("@/contents/auto-translate"));

interface AutoTranslatePopupProps extends PopupComponentProps{
     provider: AutoTranslateProvider
}
export default function AutoTranslatePopup({provider, triggerButton}: AutoTranslatePopupProps){
     const {t} = useTranslation("auto-translate")
     const [open, setOpen] = useState(false)
     return (
          <AppModal
               title={t("title")}
               description={t("desc",{provider: PROVIDER_NAMES[provider]})}
               triggerButton={triggerButton}
               open={open} onOpenChange={setOpen}
          >
               <Suspense fallback={<AutoTranslateLoader provider={provider}/>}>
                    <AutoTranslate provider={provider} setOpen={setOpen}/>
               </Suspense>
          </AppModal>
     )
}