import AppModal from "@/components/popups/modal";
import { PopupComponentProps } from "@/lib/types";
import { lazy, Suspense, useState } from "react";
import { NewTranslationLoader } from "@/loaders/contents/form";

const NewTranslation = lazy(()=>import("@/contents/new-translation"));

export default function NewTranslationPopup({triggerButton}: PopupComponentProps){
     const [open, setOpen] = useState(false)
     return (
          <AppModal
               open={open}
               onOpenChange={setOpen}
               title="Create New Translation"
               description="Create a new translation file"
               triggerButton={triggerButton}
          >
               <Suspense fallback={<NewTranslationLoader/>}>
                    <NewTranslation setOpen={setOpen}/>
               </Suspense>
          </AppModal>
     )
}