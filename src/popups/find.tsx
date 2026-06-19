import AppModal from "@/components/popups/modal";
import { PopupComponentProps } from "@/lib/types";
import { lazy, Suspense, useState } from "react";
import { FindLoader } from "@/loaders/contents/form";

const FindContent = lazy(()=>import("@/contents/find"))

export default function FindPopup({triggerButton}: PopupComponentProps){
     const [open, setOpen] = useState(false)
     return (
          <AppModal
               size="sm"
               title="Find the translation"
               description="Search for a translation you're looking for"
               triggerButton={triggerButton}
               open={open} onOpenChange={setOpen}
          >
               <Suspense fallback={<FindLoader/>}>
                    <FindContent setOpen={setOpen}/>
               </Suspense>
          </AppModal>
     )
}