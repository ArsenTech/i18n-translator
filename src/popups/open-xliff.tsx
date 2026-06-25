import AppModal from "@/components/popups/modal";
import type { PopupComponentProps } from "@/lib/types/props";
import { lazy, Suspense, useState } from "react";
import { OpenXliffLoader } from "@/loaders/contents/form";

const OpenXliff = lazy(()=>import("@/contents/open-xliff"));

export default function OpenXliffPopup({triggerButton}: PopupComponentProps){
     const [open, setOpen] = useState(false)
     return (
          <AppModal
               open={open}
               onOpenChange={setOpen}
               title="Open XLIFF Translation"
               description="Open the XLIFF translation file to start translating"
               triggerButton={triggerButton}
          >
               <Suspense fallback={<OpenXliffLoader/>}>
                    <OpenXliff setOpen={setOpen}/>
               </Suspense>
          </AppModal>
     )
}