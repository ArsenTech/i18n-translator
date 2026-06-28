import AppModal from "@/components/popups/modal";
import type { PopupComponentProps } from "@/lib/types/props";
import { lazy, Suspense, useState } from "react";
import { OpenXliffLoader } from "@/loaders/contents/form";
import { useTranslation } from "react-i18next";

const OpenXliff = lazy(()=>import("@/contents/open-xliff"));

export default function OpenXliffPopup({triggerButton}: PopupComponentProps){
     const {t} = useTranslation("file-actions",{
          keyPrefix: "open-xliff"
     })
     const [open, setOpen] = useState(false)
     return (
          <AppModal
               open={open}
               onOpenChange={setOpen}
               title={t("title")}
               description={t("desc")}
               triggerButton={triggerButton}
          >
               <Suspense fallback={<OpenXliffLoader/>}>
                    <OpenXliff setOpen={setOpen}/>
               </Suspense>
          </AppModal>
     )
}