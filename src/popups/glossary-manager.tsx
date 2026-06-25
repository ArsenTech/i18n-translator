import AppModal from "@/components/popups/modal";
import type { PopupComponentProps } from "@/lib/types/props";
import { GlossaryManagerLoader } from "@/loaders/contents";
import { lazy, Suspense } from "react";

const GlossaryManager = lazy(()=>import("@/contents/glossary-manager"));

export default function GlossaryManagerPopup({triggerButton}: PopupComponentProps){
     return (
          <AppModal
               title="Glossary Manager"
               description="Feel free to manage translation glossaries"
               size="xl"
               triggerButton={triggerButton}
          >
               <Suspense fallback={<GlossaryManagerLoader/>}>
                    <GlossaryManager/>
               </Suspense>
          </AppModal>
     )
}