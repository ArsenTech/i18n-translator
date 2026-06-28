import AppModal from "@/components/popups/modal";
import type { PopupComponentProps } from "@/lib/types/props";
import { lazy, Suspense, useState } from "react";
import { BatchRenameKeysLoader } from "@/loaders/contents/form";
import { useTranslation } from "react-i18next";

const BatchRenameKeys = lazy(()=>import("@/contents/batch-rename-keys"));

export default function BatchRenameKeysPopup({triggerButton}: PopupComponentProps){
     const {t} = useTranslation("replace",{
          keyPrefix: "batch-rename"
     })
     const [open, setOpen] = useState(false)
     return (
          <AppModal
               size="sm"
               title={t("title")}
               description={t("desc")}
               triggerButton={triggerButton}
               open={open} onOpenChange={setOpen}
          >
               <Suspense fallback={<BatchRenameKeysLoader/>}>
                    <BatchRenameKeys setOpen={setOpen}/>
               </Suspense>
          </AppModal>
     )
}