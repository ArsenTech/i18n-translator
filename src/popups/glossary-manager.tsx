import AppModal from "@/components/popups/modal";
import { PopupComponentProps } from "@/lib/types";
import GlossaryManagerLoader from "@/loaders/contents/glossary-manager";
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