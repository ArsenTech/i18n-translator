import AppModal from "@/components/popups/modal";
import type { PopupComponentProps } from "@/lib/types/props";
import { SpellCheckWorkflowLoader } from "@/loaders/contents/spell-check";
import { lazy, Suspense } from "react";

const SpellCheckWorkflow = lazy(()=>import("@/contents/spell-check/workflow"));

export default function SpellCheckWorkflowPopup({open, setOpen}: PopupComponentProps){
     return (
          <AppModal
               size="lg"
               title="Spell Check"
               description="Spell checking using Hunspell"
               open={open}
               onOpenChange={setOpen}
          >
               <Suspense fallback={<SpellCheckWorkflowLoader/>}>
                    <SpellCheckWorkflow/>
               </Suspense>
          </AppModal>
     )
}