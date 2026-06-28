import AppModal from "@/components/popups/modal";
import { AutoTranslateProvider } from "@/schemas/types";
import { PROVIDER_NAMES } from "@/lib/constants";
import type { PopupComponentProps } from "@/lib/types/props";
import { lazy, Suspense } from "react";
import { AutoTranslateLoader } from "@/loaders/contents/form";
import { useTranslation } from "react-i18next";
import { usePopupOpen } from "@/hooks/use-popup-open";

const AutoTranslate = lazy(()=>import("@/contents/auto-translate"));

interface AutoTranslatePopupProps extends PopupComponentProps{
     provider: AutoTranslateProvider
}
export default function AutoTranslatePopup({provider, triggerButton, open, setOpen}: AutoTranslatePopupProps){
     const {t} = useTranslation("auto-translate")
     const {actualOpen, setActualOpen} = usePopupOpen({open, setOpen})
     return (
          <AppModal
               title={t("title")}
               description={t("desc",{provider: PROVIDER_NAMES[provider]})}
               triggerButton={triggerButton}
               open={actualOpen}
               onOpenChange={setActualOpen}
          >
               <Suspense fallback={<AutoTranslateLoader provider={provider}/>}>
                    <AutoTranslate provider={provider} setOpen={setActualOpen}/>
               </Suspense>
          </AppModal>
     )
}