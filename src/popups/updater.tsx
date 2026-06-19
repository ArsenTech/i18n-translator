import AppModal from "@/components/popups/modal";
import { PopupComponentProps } from "@/lib/types";
import { lazy, Suspense, useState } from "react";
import { useTranslation } from "react-i18next";
import UpdaterLoader from "@/loaders/contents/updater";

const UpdaterContent = lazy(()=>import("@/contents/updater"));

export default function UpdaterPopup({triggerButton}: PopupComponentProps){
     const [isOpen, setIsOpen] = useState(false)
     const {t} = useTranslation("update")
     return (
          <AppModal
               title={t("title")}
               triggerButton={triggerButton}
               size="xs"
               className="gap-3"
               open={isOpen}
               onOpenChange={setIsOpen}
          >
               <Suspense fallback={<UpdaterLoader/>}>
                    <UpdaterContent isOpen={isOpen}/>
               </Suspense>
          </AppModal>
     )
}