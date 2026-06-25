import AppModal from "@/components/popups/modal";
import type { PopupComponentProps } from "@/lib/types/props";
import { lazy, Suspense, useState } from "react";
import { useTranslation } from "react-i18next";
import { UpdaterLoader } from "@/loaders/contents";

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
                    <UpdaterContent open={isOpen}/>
               </Suspense>
          </AppModal>
     )
}