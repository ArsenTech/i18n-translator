import AppModal from "@/components/popups/modal";
import { PopupComponentProps } from "@/lib/types";
import { lazy, Suspense, useState } from "react";
import { ReplaceTranslationLoader } from "@/loaders/contents/form";

const ReplaceTranslation = lazy(()=>import("@/contents/replace-translation"));

export default function ReplaceTranslationPopup({triggerButton}: PopupComponentProps){
     const [open, setOpen] = useState(false)
     return (
          <AppModal
               size="sm"
               title="Replace the translation"
               description="Replace existing translations"
               triggerButton={triggerButton}
               open={open} onOpenChange={setOpen}
          >
               <Suspense fallback={<ReplaceTranslationLoader/>}>
                    <ReplaceTranslation setOpen={setOpen}/>
               </Suspense>
          </AppModal>
     )
}