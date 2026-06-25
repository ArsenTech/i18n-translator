import AppModal from "@/components/popups/modal";
import type { PopupComponentProps } from "@/lib/types/props";
import { lazy, Suspense, useState } from "react";
import { BatchRenameKeysLoader } from "@/loaders/contents/form";

const BatchRenameKeys = lazy(()=>import("@/contents/batch-rename-keys"));

export default function BatchRenameKeysPopup({triggerButton}: PopupComponentProps){
     const [open, setOpen] = useState(false)
     return (
          <AppModal
               size="sm"
               title="Batch rename keys"
               description="Rename many keys at once"
               triggerButton={triggerButton}
               open={open} onOpenChange={setOpen}
          >
               <Suspense fallback={<BatchRenameKeysLoader/>}>
                    <BatchRenameKeys setOpen={setOpen}/>
               </Suspense>
          </AppModal>
     )
}