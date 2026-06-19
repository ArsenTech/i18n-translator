import AppModal from "@/components/popups/modal";
import { PopupComponentProps } from "@/lib/types";
import { lazy, Suspense, useState } from "react";
import { SpellCheckerLoader } from "@/loaders/contents/spell-check";

const SpellChecker = lazy(()=>import("@/contents/spell-check"));

export default function SpellCheckPopup({triggerButton}: PopupComponentProps){
     const [open, setOpen] = useState(false)
     return (
          <AppModal
               size="sm"
               title="Spell Check"
               description="Spell checking using Hunspell"
               triggerButton={triggerButton}
               open={open} onOpenChange={setOpen}
          >
               <Suspense fallback={<SpellCheckerLoader/>}>
                    <SpellChecker/>
               </Suspense>
          </AppModal>
     )
}