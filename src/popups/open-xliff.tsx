import AppModal from "@/components/popups/modal";
import type { PopupComponentProps } from "@/lib/types/props";
import { lazy, Suspense, useState } from "react";
import { OpenXliffLoader } from "@/loaders/contents/form";
import { useTranslation } from "react-i18next";

const OpenXliff = lazy(()=>import("@/contents/open-xliff"));

export default function OpenXliffPopup({triggerButton}: PopupComponentProps){
     const {t} = useTranslation("file-actions")
     const [open, setOpen] = useState(false)
     return (
          <AppModal
               open={open}
               onOpenChange={setOpen}
               title={t("open-xliff.title")}
               description={t("open-xliff.desc")}
               triggerButton={triggerButton}
          >
               <Suspense fallback={<OpenXliffLoader/>}>
                    <OpenXliff setOpen={setOpen}/>
               </Suspense>
          </AppModal>
     )
}