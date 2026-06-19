import AppModal from "@/components/popups/modal";
import { PopupComponentProps } from "@/lib/types";
import { lazy, Suspense, useState } from "react";
import { OpenTranslationLoader } from "@/loaders/contents/form";

const OpenTranslation = lazy(()=>import("@/contents/open-translation"));

export default function OpenTranslationPopup({triggerButton}: PopupComponentProps){
     const [open, setOpen] = useState(false)
     return (
          <AppModal
               open={open}
               onOpenChange={setOpen}
               title="Open Translation"
               description="Open base and target language translations to start translating"
               triggerButton={triggerButton}
          >
               <Suspense fallback={<OpenTranslationLoader/>}>
                    <OpenTranslation setOpen={setOpen}/>
               </Suspense>
          </AppModal>
     )
}