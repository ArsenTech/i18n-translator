import AppModal from "@/components/popups/modal";
import type { PopupComponentProps } from "@/lib/types/props";
import { lazy, Suspense, useState } from "react";
import { FindLoader } from "@/loaders/contents/form";
import { useTranslation } from "react-i18next";

const FindContent = lazy(()=>import("@/contents/find"))

export default function FindPopup({triggerButton}: PopupComponentProps){
     const {t} = useTranslation("find")
     const [open, setOpen] = useState(false)
     return (
          <AppModal
               size="sm"
               title={t("title")}
               description={t("desc")}
               triggerButton={triggerButton}
               open={open} onOpenChange={setOpen}
          >
               <Suspense fallback={<FindLoader/>}>
                    <FindContent setOpen={setOpen}/>
               </Suspense>
          </AppModal>
     )
}