import AppModal from "@/components/popups/modal";
import type { PopupComponentProps } from "@/lib/types/props";
import { lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { UpdaterLoader } from "@/loaders/contents";
import { usePopupOpen } from "@/hooks/use-popup-open";

const UpdaterContent = lazy(()=>import("@/contents/updater"));

export default function UpdaterPopup({triggerButton, modal=true, setOpen, open}: PopupComponentProps){
     const {t} = useTranslation("update")
     const {actualOpen, setActualOpen} = usePopupOpen({open, setOpen})
     return (
          <AppModal
               title={t("title")}
               triggerButton={triggerButton}
               size="xs"
               className="gap-3"
               open={actualOpen}
               onOpenChange={setActualOpen}
               modal={modal}
          >
               <Suspense fallback={<UpdaterLoader/>}>
                    <UpdaterContent open={actualOpen}/>
               </Suspense>
          </AppModal>
     )
}