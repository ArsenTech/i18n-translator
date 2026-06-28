import AppModal from "@/components/popups/modal";
import type { PopupComponentProps } from "@/lib/types/props";
import { lazy, Suspense } from "react";
import { OpenXliffLoader } from "@/loaders/contents/form";
import { useTranslation } from "react-i18next";
import { usePopupOpen } from "@/hooks/use-popup-open";

const OpenXliff = lazy(()=>import("@/contents/open-xliff"));

export default function OpenXliffPopup({triggerButton, modal=true, open, setOpen}: PopupComponentProps){
     const {t} = useTranslation("file-actions",{
          keyPrefix: "open-xliff"
     })
     const {actualOpen, setActualOpen} = usePopupOpen({open, setOpen})
     return (
          <AppModal
               open={actualOpen}
               onOpenChange={setActualOpen}
               title={t("title")}
               description={t("desc")}
               triggerButton={triggerButton}
               modal={modal}
          >
               <Suspense fallback={<OpenXliffLoader/>}>
                    <OpenXliff setOpen={setActualOpen}/>
               </Suspense>
          </AppModal>
     )
}