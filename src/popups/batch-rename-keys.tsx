import AppModal from "@/components/popups/modal";
import type { PopupComponentProps } from "@/lib/types/props";
import { lazy, Suspense } from "react";
import { BatchRenameKeysLoader } from "@/loaders/contents/form";
import { useTranslation } from "react-i18next";
import { usePopupOpen } from "@/hooks/use-popup-open";

const BatchRenameKeys = lazy(()=>import("@/contents/batch-rename-keys"));

export default function BatchRenameKeysPopup({triggerButton, modal=true, open, setOpen}: PopupComponentProps){
     const {t} = useTranslation("replace",{
          keyPrefix: "batch-rename"
     })
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
               <Suspense fallback={<BatchRenameKeysLoader/>}>
                    <BatchRenameKeys setOpen={setActualOpen}/>
               </Suspense>
          </AppModal>
     )
}